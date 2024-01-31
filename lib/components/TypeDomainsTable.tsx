"use client";

import Table from "./Table";
import {createColumnHelper, ColumnDef} from "@tanstack/react-table";
import Link from "./Link";
import {useMemo} from "react";
import {SchemaDotOrgDataSet} from "webdatacommons";

export interface TypeDomain {
  domain: string;
  stats: Omit<
    SchemaDotOrgDataSet.ClassSubset.PayLevelDomainSubset.Stats,
    "domain"
  > & {
    majesticMillionGlobalRank: number | null;
  };
}

const columnHelper = createColumnHelper<TypeDomain>();

const domainColumn: ColumnDef<TypeDomain, any> = columnHelper.accessor(
  "domain",
  {
    filterFn: "includesString",
    header: () => "Domain",
  }
);

const majesticMillionGlobalRankColumn: ColumnDef<TypeDomain, any> =
  columnHelper.accessor("stats.majesticMillionGlobalRank", {
    cell: (context) =>
      context.getValue() !== null
        ? (context.getValue() as number).toLocaleString()
        : "",
    enableColumnFilter: false,
    id: "stats.majesticMillionGlobalRank",
    header: () => "Majestic Million global rank",
    sortingFn: (rowA, rowB, columnId) => {
      const valueA: number = rowA.getValue(columnId) ?? Number.MAX_SAFE_INTEGER;
      const valueB: number = rowB.getValue(columnId) ?? Number.MAX_SAFE_INTEGER;
      return valueA - valueB;
    },
  });

const webDataCommonsPldStatsColumns: ColumnDef<TypeDomain, any>[] = [
  columnHelper.accessor("stats.entitiesOfClass", {
    cell: (context) => (context.getValue() as number).toLocaleString(),
    enableColumnFilter: false,
    id: "stats.entitiesOfClass",
    header: () => "Found unique instances",
  }),
  columnHelper.accessor("stats.quadsOfSubset", {
    cell: (context) => (context.getValue() as number).toLocaleString(),
    enableColumnFilter: false,
    id: "stats.quadsOfSubset",
    header: () => "Found unique quads",
  }),
  columnHelper.accessor("stats.propertiesAndDensity", {
    cell: (context) => {
      const propertiesAndDensityMap: Record<string, number> =
        context.getValue();

      const propertiesAndDensityArray = Object.keys(propertiesAndDensityMap)
        .reduce(
          (array, property) => {
            array.push({property, density: propertiesAndDensityMap[property]});
            return array;
          },
          [] as {property: string; density: number}[]
        )
        .sort((left, right) => (left.density - right.density) * -1);

      return propertiesAndDensityArray.map(({property, density}, propertyI) => (
        <span key={property}>
          <Link href={`https://schema.org/` + property}>{property}</Link>
          &nbsp;(
          {density.toLocaleString()})
          {propertyI + 1 < propertiesAndDensityArray.length ? (
            <span>&nbsp;&#183;&nbsp;</span>
          ) : null}
        </span>
      ));
    },
    filterFn: (row, columnId, filterValue) => {
      const propertiesAndDensityMap: Record<string, number> =
        row.getValue(columnId);
      return !!propertiesAndDensityMap[filterValue];
    },
    enableSorting: false,
    id: "properties",
    header: () => "Property (density)",
  }),
];

export default function TypeDomainsTable({rows}: {rows: TypeDomain[]}) {
  const columns = useMemo(() => {
    const columns: ColumnDef<TypeDomain, any>[] = [domainColumn];
    if (rows.some((row) => row.stats.majesticMillionGlobalRank !== null)) {
      columns.push(majesticMillionGlobalRankColumn);
    }
    columns.push(...webDataCommonsPldStatsColumns);
    return columns;
  }, [rows]);

  return (
    <Table
      columns={columns}
      initialState={{
        pagination: {pageSize: 5},
        sorting: [{desc: true, id: "stats.entitiesOfClass"}],
      }}
      rows={rows}
    />
  );
}

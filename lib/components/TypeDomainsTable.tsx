"use client";

import Table from "./Table";
import {createColumnHelper, ColumnDef} from "@tanstack/react-table";
import WebDataCommonsClassPayLevelDomainStats from "../models/WebDataCommonsClassPayLevelDomainStats";
import Link from "./Link";

interface TypeDomain {
  domain: string;
  stats: Omit<WebDataCommonsClassPayLevelDomainStats, "domain">;
}

const columnHelper = createColumnHelper<TypeDomain>();

const staticColumns: ColumnDef<TypeDomain, any>[] = [
  columnHelper.accessor("domain", {
    header: () => "Domain",
  }),
  columnHelper.accessor("stats.entitiesOfClass", {
    cell: (context) => (context.getValue() as number).toLocaleString(),
    id: "stats.entitiesOfClass",
    header: () => "Found unique instances",
  }),
  columnHelper.accessor("stats.quadsOfSubset", {
    cell: (context) => (context.getValue() as number).toLocaleString(),
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
    enableSorting: false,
    id: "properties",
    header: () => "Property (density)",
  }),
];

export default function TypeDomainsTable({rows}: {rows: TypeDomain[]}) {
  return (
    <Table
      columns={staticColumns}
      initialState={{
        pagination: {pageSize: 5},
        sorting: [{desc: true, id: "stats.entitiesOfClass"}],
      }}
      rows={rows}
    />
  );
}

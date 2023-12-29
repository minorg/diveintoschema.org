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

      return (
        <table className="w-100">
          <tbody>
            {propertiesAndDensityArray.map(({property, density}) => (
              <tr key={property}>
                <td className="pr-4">
                  <Link href={`https://schema.org/` + property}>
                    {property}
                  </Link>
                </td>
                <td>{density.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    },
    enableSorting: false,
    id: "properties",
    header: () => "Properties | Density",
  }),
];

export default function TypeDomainsTable({rows}: {rows: TypeDomain[]}) {
  //   const columns = useMemo(() => {
  //     const columns: ColumnDef<TypeDomain, any>[] = staticColumns.concat();

  //     const uniquePropertyKeys: Set<string> = rows.reduce(
  //       (set, row: TypeDomain) => {
  //         for (const propertyKey of Object.keys(row.stats.propertiesAndDensity)) {
  //           set.add(propertyKey);
  //         }
  //         return set;
  //       },
  //       new Set<string>()
  //     );

  //     for (const propertyKey of Array.from(uniquePropertyKeys).sort()) {
  //       columns.push(
  //         columnHelper.accessor(
  //           (row) =>
  //             row.stats.propertiesAndDensity[propertyKey] as number | undefined,
  //           {
  //             id: "property-" + propertyKey,
  //             cell: ({row}) => {
  //               const value: number | undefined = row.getValue(
  //                 "property-" + propertyKey
  //               );
  //               if (typeof value !== "undefined") {
  //                 return value.toLocaleString();
  //               } else {
  //                 return "";
  //               }
  //             },
  //             header: "Property: " + propertyKey,
  //           }
  //         )
  //       );
  //     }

  //     return columns;
  //   }, [rows]);

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

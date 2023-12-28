"use client";

import Hrefs from "@/lib/Hrefs";
import WebDataCommonsClassGeneralStats from "@/lib/models/WebDataCommonsClassGeneralStats";
import WebDataCommonsRelatedClass from "@/lib/models/WebDataCommonsRelatedClass";
import Table from "./Table";
import {createColumnHelper, ColumnDef} from "@tanstack/react-table";
import Link from "./Link";

interface Type {
  name: string;
  generalStats: WebDataCommonsClassGeneralStats;
  relatedTypes: readonly WebDataCommonsRelatedClass[];
}

const columnHelper = createColumnHelper<Type>();

const columns: ColumnDef<Type, any>[] = [
  columnHelper.accessor("name", {
    cell: (context) => (
      <a
        className="underline"
        href={Hrefs.type({name: context.cell.getValue()})}
      >
        {context.cell.getValue()}
      </a>
    ),
    header: () => "Type",
  }),
  columnHelper.accessor("generalStats.hosts", {
    cell: (context) => (context.getValue() as number).toLocaleString(),
    header: () => "Found on unique hosts",
  }),
  columnHelper.accessor("generalStats.urls", {
    cell: (context) => (context.getValue() as number).toLocaleString(),
    header: () => "Found on unique URLs",
  }),
  columnHelper.accessor("relatedTypes", {
    cell: (context) => (
      <table className="w-100">
        <thead>
          <tr>
            <th className="font-bold">Type</th>
            <th className="font-bold">Count</th>
          </tr>
        </thead>
        <tbody>
          {(context.getValue() as WebDataCommonsRelatedClass[])
            .sort((left, right) => (left.count - right.count) * -1)
            .map((relatedType) => (
              <tr key={relatedType.name}>
                <td className="pr-4">
                  <Link href={Hrefs.type(relatedType)}>{relatedType.name}</Link>
                </td>
                <td>{relatedType.count.toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    ),
    enableSorting: false,
    id: "relatedTypes",
    header: () => "Related types",
  }),
];

export default function TypesTable({rows}: {rows: Type[]}) {
  return <Table columns={columns} rows={rows} />;
}

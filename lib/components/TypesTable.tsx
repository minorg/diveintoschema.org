"use client";

import Hrefs from "@/lib/Hrefs";
import Table from "./Table";
import {createColumnHelper, ColumnDef} from "@tanstack/react-table";
import Link from "./Link";
import {Table as TableModel} from "@tanstack/react-table";
import {
  SchemaDotOrgClassGeneralStats,
  SchemaDotOrgRelatedClass,
} from "webdatacommons";

interface Type {
  name: string;
  generalStats: SchemaDotOrgClassGeneralStats;
  relatedTypes: readonly SchemaDotOrgRelatedClass[];
}

const columnHelper = createColumnHelper<Type>();

const hasRow = (rowId: string, table: TableModel<any>): boolean => {
  try {
    table.getRow(rowId);
    return true;
  } catch {
    return false;
  }
};

const columns: ColumnDef<Type, any>[] = [
  columnHelper.accessor("name", {
    cell: (context) => (
      <Link href={Hrefs.type({name: context.cell.getValue()})}>
        {context.cell.getValue()}
      </Link>
    ),
    enableColumnFilter: true,
    filterFn: "includesString",
    header: () => "Type",
  }),
  columnHelper.accessor("generalStats.hosts", {
    cell: (context) => (context.getValue() as number).toLocaleString(),
    enableColumnFilter: false,
    header: () => "Found on unique hosts",
  }),
  columnHelper.accessor("generalStats.urls", {
    cell: (context) => (context.getValue() as number).toLocaleString(),
    enableColumnFilter: false,
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
          {(context.getValue() as SchemaDotOrgRelatedClass[])
            .sort((left, right) => (left.count - right.count) * -1)
            .map((relatedType) => (
              <tr key={relatedType.name}>
                <td className="pr-4">
                  {hasRow(relatedType.name, context.table) ? (
                    <Link href={Hrefs.type(relatedType)}>
                      {relatedType.name}
                    </Link>
                  ) : (
                    <span>{relatedType.name}</span>
                  )}
                </td>
                <td>{relatedType.count.toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    ),
    enableSorting: false,
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId) as SchemaDotOrgRelatedClass[];
      const filterValueLowerCase: string = filterValue.toString().toLowerCase();
      return value.some((relatedClass) =>
        relatedClass.nameLowerCase.includes(filterValueLowerCase)
      );
    },
    id: "relatedTypes",
    header: () => "Related types",
  }),
];

export default function TypesTable({rows}: {rows: Type[]}) {
  return <Table columns={columns} getRowId={(row) => row.name} rows={rows} />;
}

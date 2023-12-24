"use client";

import Hrefs from "../Hrefs";
import WebDataCommonsClassGeneralStats from "../models/WebDataCommonsClassGeneralStats";
import WebDataCommonsRelatedClass from "../models/WebDataCommonsRelatedClass";
import Table from "./Table";
import {createColumnHelper, ColumnDef} from "@tanstack/react-table";

interface Class {
  name: string;
  generalStats: WebDataCommonsClassGeneralStats;
  relatedClasses: readonly WebDataCommonsRelatedClass[];
}

const columnHelper = createColumnHelper<Class>();

const columns: ColumnDef<Class, any>[] = [
  columnHelper.accessor("name", {
    cell: (context) => (
      <a
        className="underline"
        href={Hrefs.class_({name: context.cell.getValue()})}
      >
        {context.cell.getValue()}
      </a>
    ),
    header: () => "Class",
  }),
  columnHelper.accessor("generalStats.hosts", {
    cell: (context) => (context.getValue() as number).toLocaleString(),
    header: () => "Found on unique hosts",
  }),
  columnHelper.accessor("generalStats.urls", {
    cell: (context) => (context.getValue() as number).toLocaleString(),
    header: () => "Found on unique URLs",
  }),
  columnHelper.accessor("relatedClasses", {
    cell: (context) => (
      <table className="w-100">
        <thead>
          <tr>
            <th className="font-bold">Class</th>
            <th className="font-bold">Count</th>
          </tr>
        </thead>
        <tbody>
          {(context.getValue() as WebDataCommonsRelatedClass[])
            .sort((left, right) => (left.count - right.count) * -1)
            .map((relatedClass) => (
              <tr key={relatedClass.name}>
                <td className="pr-4">
                  <a className="underline" href={Hrefs.class_(relatedClass)}>
                    {relatedClass.name}
                  </a>
                </td>
                <td>{relatedClass.count.toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    ),
    enableSorting: false,
    id: "relatedClasses",
    header: () => "Related classes",
  }),
];

export default function ClassesTable({classes}: {classes: Class[]}) {
  return <Table columns={columns} rows={classes} />;
}

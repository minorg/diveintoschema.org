"use client";

import Hrefs from "../Hrefs";
import Table from "./Table";
import {createColumnHelper, ColumnDef} from "@tanstack/react-table";

interface RelatedClass {
  count: number;
  name: string;
}

interface Class {
  name: string;
  relatedClasses: readonly RelatedClass[];
  stats: {
    hosts: number;
    quads: number;
    urls: number;
  };
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
  columnHelper.accessor("stats.hosts", {
    cell: (context) => (context.getValue() as number).toLocaleString(),
    header: () => "Found on unique hosts",
  }),
  columnHelper.accessor("stats.urls", {
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
          {(context.getValue() as RelatedClass[])
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

"use client";

import Hrefs from "../Hrefs";
import Table from "./Table";
import {createColumnHelper, ColumnDef} from "@tanstack/react-table";

interface Class {
  name: string;
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
];

export default function ClassesTable({classes}: {classes: Class[]}) {
  return <Table columns={columns} rows={classes} />;
}

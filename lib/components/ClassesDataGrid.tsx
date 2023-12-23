"use client";

import Hrefs from "@/lib/Hrefs";
import DataGrid from "./DataGrid";
import {ColumnOrColumnGroup} from "react-data-grid";

interface Class {
  name: string;
}

const columns: ColumnOrColumnGroup<Class>[] = [
  {
    key: "name",
    name: "Class",
    editable: false,
    renderCell: ({row}) => (
      <a className="underline" href={Hrefs.class_(row)}>
        {row.name}
      </a>
    ),
    renderHeaderCell: ({column}) => (
      <span className="font-bold text-lg">{column.name}</span>
    ),
  },
];

export default function ClassesDataGrid({
  classes,
}: {
  classes: readonly Class[];
}) {
  return (
    <DataGrid
      columns={columns}
      rowKeyGetter={(row) => row.name}
      rows={classes}
    />
  );
}

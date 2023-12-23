"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import {useState} from "react";

export default function Table<RowT>({
  columns,
  rows: rowsProp,
}: {
  columns: ColumnDef<RowT, any>[];
  rows: RowT[];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data: rowsProp,
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="flex flex-col">
      <table className="border">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b text-gray-800 text-lg">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-4 font-medium text-left">
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex min-w-[36px]"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <span className="pl-2">↑</span>,
                        desc: <span className="pl-2">↓</span>,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b  even:bg-gray-50 odd:bg-white">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 pt-[14px] pb-[18px] text-gray-600"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex sm:flex-row flex-col w-full mt-8 items-center gap-2 text-xs">
        <div className="sm:mr-auto sm:mb-0 mb-2">
          <span className="mr-2">Rows per page</span>
          <select
            className="border p-1 rounded w-16 border-gray-200 text-center"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            className={`${
              !table.getCanPreviousPage()
                ? "bg-gray-100"
                : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
            } rounded p-1`}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="w-5 h-5">{"<<"}</span>
          </button>
          <button
            className={`${
              !table.getCanPreviousPage()
                ? "bg-gray-100"
                : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
            } rounded p-1`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="w-5 h-5">{"<"}</span>
          </button>
          <span className="flex items-center gap-1">
            <input
              min={1}
              max={table.getPageCount()}
              type="number"
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-10"
            />
            of {table.getPageCount()}
          </span>
          <button
            className={`${
              !table.getCanNextPage()
                ? "bg-gray-100"
                : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
            } rounded p-1`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="w-5 h-5">{">"}</span>
          </button>
          <button
            className={`${
              !table.getCanNextPage()
                ? "bg-gray-100"
                : "hover:bg-gray-200 hover:curstor-pointer bg-gray-100"
            } rounded p-1`}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="w-5 h-5">{">>"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

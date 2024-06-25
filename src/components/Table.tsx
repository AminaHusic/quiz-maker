import React from "react";
import { get } from "lodash";

interface IColumnType<T> {
  key: string;
  label: string;
  render?: JSX.Element | any;
}
interface TableProps<T> {
  data: T[];
  columns: IColumnType<T>[];
  onRowClick?: (name: string) => void;
}

const Table = <T,>({
  data,
  columns,
  onRowClick,
}: TableProps<T>): JSX.Element => {
  return (
    <table className="rounded border border-primary w-full">
      <thead className="bg-primary-dark">
        <tr>
          {columns.map((column) => {
            if (column.key === "id") return;
            return (
              <th
                className="text-left text-white font-medium uppercase text-sm px-3 py-3"
                key={String(column.key)}
              >
                {column.label}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => {
          return (
            <tr
              key={rowIndex}
              onClick={() => {
                if (onRowClick) {
                  const findId = columns.findIndex(
                    (column) => column.key === "id"
                  );
                  const value = get(item, columns[findId].key);
                  onRowClick(`/edit/${value}`);
                }
              }}
              className={`border-b border-b-primary rounded ${
                onRowClick && "cursor-pointer"
              }  hover:text-secondary text-primary hover:bg-slate-200`}
            >
              {columns.map((column) => {
                if (column.key === "id") return;

                const value = get(item, column.key);
                return (
                  <td
                    className="py-3 px-3  border-r border-r-primary"
                    key={String(column.key)}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

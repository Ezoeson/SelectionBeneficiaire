import React from "react";
import clsx from "clsx";

const TableRow = ({ children, col }) => {
  return (
    <div
      className={clsx(
        'w-full grid  grid-cols-1  p-2 bg-slate-white dark:text-white dark:bg-slate-900 even:bg-slate-100 dark:even:bg-slate-700 last:border-b-0 text-slate-950 border-b border-b-slate-400',

        col ? col : 'grid-cols-1'
      )}
    >
      {children}
    </div>
  );
};

export default TableRow;

import React from "react";
import clsx from "clsx";

const TableHeader = ({ children, col }) => {
  return (
    <div
      className={clsx(
        "w-full grid  grid-cols-1  p-2 bg-indigo-600  text-slate-50",

        col ? col : "grid-cols-1"
      )}
    >
      {children}
    </div>
  );
};

export default TableHeader;

/**
 * 
 * 
 * 
 */

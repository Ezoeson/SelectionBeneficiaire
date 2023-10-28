import React from "react";
import clsx from "clsx";

const Input = ({label, type, state, error}) => {
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor= {label}
        className="block text-sm font-medium leading-6 dark:text-gray-100 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          {...state}
          className={clsx("block w-full rounded-md border-0  py-1.5 text-gray-900 dark:bg-slate-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            error && "ring-rose-500 focus:ring-red-600"
          )}
        />
      </div>
    </div>
  );
};

export default Input;

import React from "react";

export default function PieCard(props) {
  return (
    <div className=" flex flex-col h-[275px] w-[700px] rounded-lg bg-slate-200 dark:bg-slate-700 dark:text-white mr-4 mb-4">
      <div>
        <p className="text-xl  font-semibold pl-4 pt-2"> {props.title} </p>
      </div>
      {props.children}
    </div>
  );
}

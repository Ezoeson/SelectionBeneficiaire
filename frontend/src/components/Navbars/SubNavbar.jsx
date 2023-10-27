import React from "react";
import useSubRoutes from "../../hooks/useSubRoutes";
import SubNavlink from "../Navlink/SubNavlink";
import { useLocation } from "react-router-dom";

const SubNavbar = () => {
  const subRoutes = useSubRoutes();

  const pathname = useLocation().pathname.split('/')[1];





  return (
    <div className="row-[2] px-4 h-full bg-slate-50  dark:bg-gray-600 flex items-center  space-x-2 overflow-x-auto">
      {subRoutes.map((subRoute) => (
        subRoute.page === pathname &&
        <SubNavlink
          key={subRoute.label}
          label={subRoute.label}
          active={subRoute.active}
          path={subRoute.path}
        />
      ))}
    </div>
  );
};

export default SubNavbar;

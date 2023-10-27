import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SubNavlink = ({path, active,label}) => {
  return (
    <Link className="h-full flex-shrink-0 dark:text-white" to={path}>
      <div className="relative h-full flex  items-center">
        <span>{label}</span>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: active ? "100%" : 0 }}
          transition={{ duration: 0.5 }}
          exit={{ width: 0 }}
          className="w-full bg-slate-950 dark:bg-slate-100 h-1 absolute bottom-0"
        ></motion.div>
      </div>
    </Link>
  );
};

export default SubNavlink;

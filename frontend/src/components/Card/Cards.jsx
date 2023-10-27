import React from 'react';
import {
  FcReading,
  FcBusinessman,
  FcConferenceCall,
  FcTodoList,
  FcViewDetails,
  FcCustomerSupport,
  FcBusinesswoman,
} from 'react-icons/fc';

function Cards({icon:Icon,label,data}) {
  return (
    <div className='w-60 h-24  rounded-xl p-3 bg-slate-100 text-slate-700 dark:text-slate-200 shadow-lg dark:bg-slate-900 shadow-blue-700 flex items-center space-x-4'>
      <Icon className='text-3xl -mt-3 font-bold' />
      <div>
        <p className='text-base'>{label}</p>
        <p className='text-3xl font-bold '>{data}</p>
      </div>
    </div>
  );
}

export default Cards;

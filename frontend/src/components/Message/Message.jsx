import React from 'react'

const Message = ({title, icon:Icon}) => {
  return (
    <div className="h-60 flex items-center justify-center flex-col">
          <Icon className="text-[150px]" />

          <p className='dark:text-slate-100'>{title}</p>
        </div>
  )
}

export default Message
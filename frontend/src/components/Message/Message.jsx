import React from 'react'

const Message = ({title, icon:Icon}) => {
  return (
    <div className="h-60 flex items-center justify-center flex-col">
          <Icon className="text-[150px]" />

          <p>{title}</p>
        </div>
  )
}

export default Message
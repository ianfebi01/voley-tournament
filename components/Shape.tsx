import React from 'react'

const Shape = () => {
  return (
    <div>
      <div className="absolute w-10 h-10 bg-dark-secondary top-[80%] left-24 rotate-12" />
      <div className="absolute w-0 h-0 top-[10%] left-48 rotate-6 border-l-[20px] border-b-[30px] border-r-[20px] border-l-transparent border-r-transparent border-b-dark-secondary" />
      <div className="absolute w-0 h-0 top-[25%] left-[75%] -rotate-45 border-l-[20px] border-b-[30px] border-r-[20px] border-l-transparent border-r-transparent border-b-dark-secondary" />
      <div className="absolute w-10 h-10 bg-dark-secondary inset-x-0 mx-auto -translate-x-28 top-[66%] rotate-12 scale-75" />
      <div className="absolute w-10 h-10 bg-dark-secondary top-[85%] left-[90%] -rotate-6 scale-75" />
      <div className="absolute w-0 h-0 inset-x-0 mx-auto translate-x-36 top-[60%]  rotate-6 border-l-[20px] border-b-[30px] border-r-[20px] border-l-transparent border-r-transparent border-b-dark-secondary" />
    </div>
  )
}

export default Shape

import React from 'react'

const ProgressBar = ({ percent }) => {
    const bars = percent/10;
  return (
    <div className='w-full flex gap-[5px]'>
      {[...Array(10)].map((_,index) => (
        <div className={`h-2 w-1/14 rounded-xs ${index<bars?"bg-[#02457A]":"bg-[#02457A]/30"}`}></div>
      ))}
    </div>
  )
}

export default ProgressBar

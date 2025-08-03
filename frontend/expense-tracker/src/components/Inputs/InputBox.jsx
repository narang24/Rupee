import React from 'react'

const InputBox = ({ title, eg, type, value, setValue }) => {
  return (
    <div className='flex flex-col'>
      <label className='text-[13px] md:text-sm font-semibold text-[#02457A] py-1 md:py-2'>{title}</label>
      <input type={type} value={value} placeholder={`E.g. (${eg})`} className='text-sm md:text-[16px] border-2 border-[#02457A]/40 py-1 px-1.5 rounded-md outline-none text-[#02457A] placeholder:text-[#02457A]/70' onChange={(e) => setValue(e.target.value)}/>
    </div> 
  )
}

export default InputBox

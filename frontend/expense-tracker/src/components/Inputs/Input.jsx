import React, { useState } from 'react'
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

const Input = ({ label, type, placeholder, value, onChange }) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisible=() => {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
  <div className='relative flex flex-col w-full m-1'>
    <label className='text-sm font-semibold text-[#02457A] py-2'>{label}</label>
    <div className='flex'>
    <input type={type==='password'?(isPasswordVisible?'text':'password'):type} value={value} placeholder={`${placeholder}`} className='text-sm border-1 border-[#02457A]/70 px-2.5 py-2 md:px-3 md:py-3 rounded-lg md:rounded-xl outline-none text-[#02457A] placeholder:text-[#02457A]/80 w-full' onChange={onChange}/>
    {type=='password'&& (
    <>
    {isPasswordVisible?
    <FaEyeSlash 
    size={20}
    className='text-[#02457A]/70 cursor-pointer absolute right-3 bottom-2.5 md:bottom-3.5'
    onClick={() => togglePasswordVisible()}
    />:
    <FaRegEye
    size={20}
    className='text-[#02457A] cursor-pointer absolute right-3 bottom-2.5 md:bottom-3.5'
    onClick={() => togglePasswordVisible()}
    />}
    </>
    )}
    </div>
    </div>
  )
}

export default Input

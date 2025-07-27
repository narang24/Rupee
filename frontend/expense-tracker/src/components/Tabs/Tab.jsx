import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoGrid } from "react-icons/io5";
import { FaSackDollar } from "react-icons/fa6";
import { FaHandHoldingUsd } from "react-icons/fa";
import { MdSavings } from "react-icons/md";

const Tab = ({ name, selected, onSelectTab }) => {

  const iconData = {
    'Overview': IoGrid,
    'Expenses': FaSackDollar,
    'Income': FaHandHoldingUsd,
    'Savings': MdSavings,
  }

  const navigate = useNavigate();

  const onSelect = (e,path) => {
    e.preventDefault();
    onSelectTab();
    navigate(path);
  }

  const IconComponent = iconData[name] ;
  return (
    <div className='flex items-center cursor-pointer'  onClick={(e)=>onSelect(e,`/${name}`)}>
    {selected && <div className={`h-9 rounded-r-lg w-[5px] bg-[#5DCFF3]`}/>}
    <div className='text-white/70 cursor-pointer flex items-center gap-1.5 py-2 px-5'>
      <IconComponent size={20} className={`${selected?'text-[#5DCFF3]':''}`}/>
      <span className={`text-md p-1 sm:inline ${selected?'text-white':''}`}>{name}</span>
    </div>
    </div>
  )
}

export default Tab

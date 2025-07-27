import React, { useEffect, useState } from 'react'
import { tabs } from '../../utils/constants'
import Tab from '../Tabs/Tab'
import rupeeSign from '../../../public/rupee-sign.png'
import { CiLogout } from "react-icons/ci";
import { MdClose } from "react-icons/md";

const Navbar = ({ userData, setUserData, logout, open, setOpen}) => {

  const [selectedTab, setSelectedTab] = useState('Overview');

  return (
    <div className={`${open?"":"hidden"} md:inline h-screen w-65/100 md:w-1/7 z-20 md:z-0 bg-[#02457A] fixed left-0 transition-all`}>

      <div className='relative flex items-center gap-3 py-7 md:py-6 pl-6'>
        <img src={rupeeSign} className='h-1/8 md:h-1/6 w-1/8 md:w-1/6'/>
        <h1 className='text-white text-2xl md:text-3xl font-semibold'>Rupee</h1>
        <MdClose onClick={() => setOpen(!open)} size={30} className='absolute inline md:hidden text-white bg-white/10 p-1 rounded-md m-1 right-1 top-1'/>
      </div>


      <div className='flex flex-col gap-2 mt-3'>
          <h3 className='text-white/50 text-sm tracking tracking-widest pl-6 py-3'>MENU</h3>
          <div className='flex flex-col gap-4'>
          {tabs.map((tab,index)=> {
          return (
            <Tab name={tab['name']} key={index} selected={tab['name']===selectedTab} onSelectTab={() =>  setSelectedTab(tab['name'])}/>
          )
          })}
          </div>
      </div>

      {userData && 
      <div className='w-full absolute bottom-0 px-3 py-2 flex flex-col justify-center items-center'>
      <div className='w-full h-0.5 bg-white/60 my-2'/>
      <div className='flex items-center gap-2 px-2 py-1 my-1'>
        {/* <img src=''  className='h-10 w-10 rounded-full border-1 border-white'/> */}
        <div className='flex flex-col '>
          <p className='text-xs md:text-sm text-white'>{userData.user.fullname}</p>
          <p className='text-xs md:text-sm text-white/60'>{userData.user.email}</p>
        </div>
      </div>
      <button onClick={logout} className='w-full flex justify-center items-center gap-2 text-sm md:text-[16px] text-white/70 hover:text-white my-1.5 md:mb-0 md:mt-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer'><CiLogout/>Logout</button>
      </div>}

      </div>
  )
}

export default Navbar

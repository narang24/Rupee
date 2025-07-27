import React, { useEffect, useState } from 'react'
import { RiMenu2Fill } from "react-icons/ri";


const Headbar = ({userData, open, setOpen}) => {
  const [greeting, setGreeting] = useState("Hi");
  const [filter, setFilter] = useState("");

  const greet = () => {
    const now = new Date();
    const hours = now.getHours();
    if(hours<12) setGreeting('Good Morning');
    else if(hours>12 && hours<16) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }

  useEffect(() => {
    greet();
  },[])

  return (
    <div className='fixed w-screen md:w-84/100 z-10 flex justify-center items-center md:ml-[calc(0.15*100%)] p-3 bg-[#D6E8EE]'>

      <div className='w-full flex flex-col md:flex-row md:justify-between md:items-center md:px-2'>
        <div className='flex justify-between items-center'>
          <RiMenu2Fill size={27} className='inline md:hidden text-[#02457A] bg-[#02457A]/5 p-1 rounded-md m-1' onClick={() => setOpen(!open)}/>
          {userData && <p className='text-right md:text-left text-lg md:text-xl font-semibold text-[#02457A] py-1.5 md:py-0'>{greeting}, {userData.user.fullname}!</p>}
        </div>
        <div className='md:w-33/100 px-3 py-2 text-sm text-[#02457A]/90 bg-white rounded-xl flex justify-center items-center '>
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type='text' placeholder='Wanna know where your penny went?' className='w-full h-full px-2 outline-none placeholder:text-[#02457A]/60'/>
        {/* filter box */}
        <div className='bg-[#02457A]/20 rounded-lg px-3 md:px-4 py-0.5 md:py-1'>
        Filters
        </div>
        </div>
      </div>
      
    </div>
  )
}

export default Headbar

import React, { useState } from 'react'
import { BsEmojiLaughing } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';

const IconSelector = ({ icon, setIcon, }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col justify-center items-center px-5 pt-7'>
      <div className='text-2xl border-2 border-dashed border-[#02457A]/40 flex items-center justify-center w-14 h-14 rounded-md p-3 text-[#02457A] cursor-pointer'
      onClick={() => setOpen(!open)}
      >
      {icon?<div>{icon}</div>:<div><BsEmojiLaughing/></div>}
      </div>
      <p className='text-sm text-[#02457A] py-2'>{icon?'Change Icon':'Choose Icon'}</p>

      {open && 
      <div>
      <div className='absolute right-1/5 top-1/5 z-50 max-w-fit max-h-[400px] flex flex-col gap-2 items-center'>
        <button className='text-sm bg-[#02457A] text-white flex justify-between items-center p-2 gap-3 rounded-md cursor-pointer' onClick={() => setOpen(!open)}><IoIosCloseCircle className='text-xl'/>Close</button>
        <EmojiPicker onEmojiClick={(emoji) => {setIcon(emoji.emoji); setOpen(false)}}/>
      </div>
      </div>
      }
    </div>
  )
}

export default IconSelector

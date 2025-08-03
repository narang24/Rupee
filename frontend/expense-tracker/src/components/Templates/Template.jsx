import React, { useEffect, useState } from 'react'
import { IoIosTrendingDown, IoIosTrendingUp } from 'react-icons/io';
import rupeeSign from '../../../public/rupee-sign.png'


const Template = ({ type, templateData,  }) => {

    const [icon, setIcon] = useState("");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());
    const [file, setFile] = useState(null);

    useEffect(() => {
        if(templateData) {
        setIcon(templateData.icon)
        setCategory(templateData.category)
        setName(templateData.name)
        setAmount(templateData.amount)
        setDate(templateData.date)
        setFile(templateData.fileUrl)
        }
    },[templateData])

  return (
    <div className='my-3 bg-[#D6E8EE]/70 rounded-3xl px-2.5 pt-2.5'>

        {file && <div className='shadow-lg shadow-gray-700/50 rounded-3xl'>
        <img src={file} className='rounded-3xl'/>
        </div>}

        {!file && <div className='shadow-xs shadow-gray-700/50 rounded-3xl bg-white h-[180px] flex justify-center items-center'>
        <img src={rupeeSign} className='rounded-3xl h-8 w-8'/>
        </div>}

        <div className=''>
        <div className='px-3 py-5'>
            <div className='border-b-2 border-[#02457A]/40 py-2'>
                <p className='text-sm font-bold text-[#02457A]'>{name}</p>
                <p className='text-xs font-semibold text-[#02457A]/70'>{category}</p>
            </div>
            <div className='px-1 pt-4 flex justify-between'>
            <div className='text-[#02457A]/70 text-xs font-semibold'>{type} added on <div className='text-sm text-[#02457A] font-semibold'>{new Date(date)?.toLocaleDateString('en-GB',{ day: '2-digit', month: 'long', year: 'numeric' })}</div></div>
            <div className={`font-extrabold ${type==='Expense'?'text-red-700':'text-green-700'} flex justify-center items-center gap-1`}>₹{amount}{(type==='Expense')?<IoIosTrendingDown/>:<IoIosTrendingUp/>}</div>
            </div>
            {/* <div className='text-white text-xs font-semibold flex items-center gap-1.5'>Rupee<img src={rupeeSign} className='h-4 w-4'/></div> */}
        </div>

        </div>

    </div>
  )
}

export default Template

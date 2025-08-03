import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import InputBox from './Inputs/InputBox';
import IconSelector from './Inputs/IconSelector';
import { FiUploadCloud } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const GoalModal = ({ closeModal, title, getData, goalToEdit }) => {

  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [input, setInput] = useState('');
  const [total, setTotal] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    if(goalToEdit) {
    setIcon(goalToEdit.icon)
    setName(goalToEdit.name)
    setInput(goalToEdit.input)
    setTotal(goalToEdit.total)
    }
  },[goalToEdit])

  const clearFields = () => {
    setIcon("")
    setName("")
    setInput("")
    setTotal("")
    setError("")
  }

  const addGoal = async () => {
    if(!name) {
        setError('Goal is required')
        return;
    }
    if(!total) {
        setError('Total is required')
        return;
    }

    try {
        const response = await axiosInstance.post('/api/savings/goals/add',{
            icon,
            name,
            total: Number(total),
            input: Number(input),
        });
        if(response.data) {
            closeModal();
            toast.success(response.data.message,{
                duration: 1000
            });
            setTimeout(() => {
                getData();
            }, 300);
        }
    } catch(error) {
        console.log(error);
    }
  }

  const editGoal = async () => {
    const { _id } = goalToEdit;
    
    if(!name) {
        setError('Goal is required')
        return;
    }
    if(!total) {
        setError('Total is required')
        return;
    }

    try {
        const response = await axiosInstance.put(`/api/savings/goals/edit/${_id}`,{
            icon,
            name,
            total: Number(total),
            input: Number(input)
        });
        if(response.data) {
            closeModal();
            toast.success(response.data.message,{
                duration: 1000,
            });
            setTimeout(() => {
                getData();
            },300)
        }
    } catch(error) {
        console.log(error);
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/50'>
      <div className='w-[85vw] md:w-[33vw] max-h-[88vh] bg-white overflow-y-auto rounded-xl shadow-md shadow-gray-700/50'>
        <div className='flex justify-between items-center py-2.5 md:py-3 px-4.5 md:px-5 border-b-2 border-[#02457A]/50'>
            <div className='flex flex-col'>
            <h3 className='text-semibold text-[#02457A] md:text-lg font-semibold'>{title}</h3>
            <p className='text-[13px] md:text-sm tracking-wide text-[#02457A]/60'>Fill in the Goal details</p>
            </div>
            <button className='bg-[#02457A]/5 text-[#02457A] hover:bg-[#02457A] hover:text-white rounded-md p-1.5 md:p-2 cursor-pointer' onClick={closeModal}><AiOutlineClose/></button>
        </div>

        <div className=''>
        <IconSelector icon={icon} setIcon={setIcon}/>
        <div className='grid grid-cols-2 gap-5 md:gap-7 px-4 md:px-5 py-2 md:py-3'>
            <InputBox title='Goal' eg='Car' type='text' value={name} setValue={setName}/>
            <InputBox title='Total Amount' eg='400000' type='text' value={total} setValue={setTotal}/>
            <InputBox title='Savings' eg='10000' type='text' value={input} setValue={setInput}/>
        </div>
        {error && <p className='text-[12px] md:text-[13px] px-5 tracking-wide text-red-700'>*{error}</p>}
        <div className='flex gap-2 justify-end items-center mx-5 mb-4'>
            <button className='text-[13px] md:text-sm text-[#02457A] font-bold px-3 md:px-4 py-1 md:py-1.5 border-[2px] border-[#02457A]/40 rounded-md cursor-pointer' onClick={clearFields}>Clear</button>
            <button className='text-[13px] md:text-sm text-white font-bold px-3 md:px-4 py-1.5 md:py-2 bg-[#02457A] rounded-md flex justify-center items-center gap-1 md:gap-2 cursor-pointer' onClick={(title==='Add Goal')?addGoal:editGoal}>Done <IoMdCheckmarkCircleOutline className='text-[16px]'/></button>
        </div>
        </div>

      </div>
    </div>
    )
}

export default GoalModal

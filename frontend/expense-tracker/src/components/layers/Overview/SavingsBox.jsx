import React, { useEffect, useState } from 'react'
import CategoryPieChart from '../../Charts/CategoryPieChart'
import ProgressBar from '../../Charts/ProgressBar';
import { MdDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import axiosInstance from '../../../utils/axiosInstance';
import toast from 'react-hot-toast';
import GoalModal from '../../GoalModal';
import { FaPlus } from 'react-icons/fa6';

const SavingsBox = () => {

    const [modal, setModal] = useState('Add');
    const [openModal, setOpenModal] = useState(false);
    const [goalToEdit, setGoalToEdit] = useState(null);

    const [data, setData] = useState([]);

    const handleModal = (value) => {
        setModal(value);
        setOpenModal(true);
    }

    const getGoalToEdit = async ({ _id }) => {
        try {
            const response = await axiosInstance.get(`/api/savings/goals/get/${_id}`);
            if(response.data) {
                setGoalToEdit(response.data.goal);
            }
        } catch(error) {
            console.log(error);
        }
    }

    const getData = async () => {
        try {
        const response = await axiosInstance.get('/api/savings/goals/get-all');
        if(response.data) {
            setData(response.data.goals);
        }
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    },[])

    const percent = (input,total) => {
        return Math.round(input/total*100*100,2)/100;
    }

    const deleteGoal = async ({ _id }) => {
        try {
            const response = await axiosInstance.delete(`/api/savings/goals/delete/${_id}`);
            if(response.data) {
                toast.success(response.data.message,{
                    duration: 500
                });
                getData();
            }
        } catch(error) {
            console.log(error);
        }
    }

  return (
    <div className='flex-1 text-[#02457A] bg-white rounded-xl shadow-md hover:shadow-lg shadow-gray-300'>
      
      <div className='px-5 md:px-6 pt-4.5 md:pt-6 flex justify-between items-center'>
      <div className='text-[#02457A]/90 text-md font-semibold'>My Goals</div>
      <button className='text-[13px] md:text-[13px] text-white px-3 md:px-3 py-1.5 md:py-1.5 bg-[#02457A]/90 rounded-sm flex justify-center items-center cursor-pointer' onClick={() => handleModal('Add')}>Add Goals</button>
      </div>

      <div className='px-8 my-3.5 flex flex-col gap-5 h-[280px] overflow-y-auto scrollbar-custom2'>
      {data && data.map((item,index) => (
        <div className='flex flex-col gap-3'>

        <div key={index} className='flex items-center justify-between'>
            {/* {item.icon && <div>{item.icon}</div>} */}
            <div className='flex flex-col gap-1 tracking-wide'>
                <p className='text-sm font-semibold'>{item.icon} {item.name}</p>
                <p className='text-sm'><span className='font-semibold'>₹{item.input.toString().split('.')[0].toLocaleString('en-IN')}.{item.input.toString().split('.')[1]||'00'}</span> <span className='text-[#02457A]/60'>/ ₹{item.total.toString().split('.')[0].toLocaleString('en-IN')}.{item.total.toString().split('.')[1]||'00'}</span></p>
            </div>
            <span className='text-sm font-semibold'>{percent(item.input,item.total)}%</span>
        </div>

        <div className='flex justify-between items-center'>
        <ProgressBar percent={percent(item.input,item.total)}/>
        <div className='flex gap-2'>
            {/* {item.input === item.total?
            <div className='text-sm text-green-700 flex justify-center items-center gap-0.5 font-semibold'>Achieved<IoMdCheckmarkCircleOutline/></div>: */}
            <button className='text-[#02457A] hover:text-[#02457A]/75 cursor-pointer' onClick={() => { handleModal('Edit'); getGoalToEdit(item); }}><MdOutlineModeEdit /></button>
            {/* } */}
            <button className='text-[#02457A] hover:text-red-700 cursor-pointer' onClick={() => deleteGoal(item)}><MdDeleteOutline /></button>
        </div>
        </div>

        </div>
      ))}
    </div>

    {openModal && <GoalModal
    title = {`${modal} Goal`}
    closeModal = {() => setOpenModal(!openModal)}
    getData = {getData}
    goalToEdit = {modal==='Edit'?goalToEdit:null}
    />}

    </div>
  )
}

export default SavingsBox

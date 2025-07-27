import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { IoIosTrendingDown, IoIosArrowDown, IoIosArrowUp, IoIosTrendingUp } from "react-icons/io";
import { FiFileText, FiDownload } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import Modal from '../Modal';

const ExpenseHistory = ({ type, expenseData, oldExpenseData, getExpenses, deleteExpense, }) => {

  const [indexOpen, setIndexOpen] = useState(null);
  const [modal, setModal] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [select, setSelect] = useState('recently');
  const [data, setData] = useState([]);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  useEffect(() => {
    setData(select==='recently'?expenseData:oldExpenseData)
  },[expenseData, oldExpenseData, select])

  //Get Income or Expense
  const getExpenseToEdit = async ({ _id }) => {
    try {
      const response = await axiosInstance.get(`/api/${type.toLowerCase()}/get/${_id}`);
      if(response.data) {
      setExpenseToEdit(response.data);
      }
    } catch(error) {
      console.log('Server Error');
    }
  }

  const handleModal = ( value ) => {
    setModal(value);
    setOpenModal(!openModal);
  }

  return (
    <div className='bg-white rounded-xl p-2 md:p-3 mx-2 mb-8'>

      <div className='flex justify-between md:items-center px-3 py-2 md:py-1'>
        <p className='text-[#02457A] md:text-lg font-semibold'>{type} History</p>

        <div className='flex flex-col items-center md:flex-row gap-2 md:gap-5'>
        <button className='flex gap-2 justify-center items-center bg-[#02457A] text-white px-3 py-2 text-xs md:text-sm rounded-md cursor-pointer' onClick={() => handleModal('Add')}>Add {type}<FaPlus /></button>
        <div className='flex gap-2 md:gap-3 text-[#02457A]/70'>
            <button className={`hover:text-[#02457A] text-[14px] md:text-[15px] ${select=='recently'?'text-[#02457A] text-[15px] md:text-[16px]':''} cursor-pointer outline-none`} onClick={() => {setSelect('recently')}}>Recently</button>
            <button className={`hover:text-[#02457A] text-[14px] md:text-[15px] ${select=='oldest'?'text-[#02457A] text-[15px] md:text-[16px]':''} cursor-pointer outline-none`} onClick={() => {setSelect('oldest')}}>Oldest</button>
        </div>
        </div>

      </div>

      <div className='grid grid-cols-1 gap-2 md:gap-4 p-2'>

      <div className='hidden md:flex px-2 py-1 text-left text-xs md:text-[16px]'>
        <div className='w-25/100 md:w-30/100 text-[#02457A]/80'>Reciever</div>
        <div className='w-15/100 md:w-15/100  text-[#02457A]/80'>Type</div>
        <div className='w-25/100 md:w-20/100  text-[#02457A]/80'>Date</div>
        <div className='w-25/100 md:w-15/100 text-[#02457A]/80'>Amount</div>
        <div className='w-10/100 md:w-10/100 text-[#02457A]/80'>File</div>
      </div>

        {data && data.map((expense, index) => (
            <div key={index} className='hidden md:inline text-xs md:text-[14px]'>
            <div className='flex px-2 py-1.5 text-left border-b-1 border-[#02457A]/30 '>
                <div className='w-25/100 md:w-30/100 font-semibold text-[#02457A]/90'>{expense.icon} {expense.name}</div>
                <div className='w-15/100 md:w-15/100  text-[#02457A]/70'>{expense.category}</div>
                <div className='w-25/100 md:w-20/100  text-[#02457A]/70'>{expense.date}</div>
                <div className={`w-25/100 md:w-15/100 font-bold ${type==='Income'?'text-green-700':'text-red-700'} flex items-center gap-1`}>₹{expense.amount}{type==='Income'?<IoIosTrendingUp />:<IoIosTrendingDown/>}</div>
                <a className='w-10/100 md:w-10/100 text-lg text-[#02457A] cursor-pointer hover:text-[#02457A]/75' href={expense.fileUrl || ''} target='_blank'><FiFileText /></a>

                <div className='flex gap-5 items-center text-lg text-right'>
                  <button className='text-[#02457A] hover:text-[#02457A]/75 cursor-pointer' onClick={() => { handleModal('Edit'); getExpenseToEdit(expense); }}><MdOutlineModeEdit /></button>
                  <button className='text-[#02457A] hover:text-[#02457A]/75 cursor-pointer'><FiDownload /></button>
                  <button className='text-[#02457A] hover:text-red-700 cursor-pointer' onClick={() => deleteExpense(expense)}><MdDeleteOutline /></button>
                </div>

            </div>
            </div>
        ))}

        {data && data.map((expense, index) => (
            indexOpen===index?
            <>
            <div key={index} className='inline md:hidden'>
            <div className='flex justify-between items-end px-2 py-2.5 text-left border-b-2 border-[#02457A]/50'>
              
              <div className='flex flex-col justify-center items-start gap-0.5'>
                <div className='text-[15px] font-semibold text-[#02457A]/90'><span className='text-sm font-semibold text-[#02457A]/90'>Reciever: </span>{expense.icon} {expense.name}</div>
                <div className='text-[15px] text-[#02457A]/70'><span className='text-sm font-semibold text-[#02457A]/90'>Category: </span>{expense.category}</div>
                <div className='text-[15px] text-[#02457A]/70'><span className='text-sm font-semibold text-[#02457A]/90'>Date: </span>{expense.date}</div>
                <div className={`text-[15px] font-bold ${type==='Income'?'text-green-700':'text-red-700'} flex items-center gap-1`}><span className='text-sm font-semibold text-[#02457A]/90'>Amount: </span>₹{expense.amount}{type==='Income'?<IoIosTrendingUp />:<IoIosTrendingDown/>}</div>
                <a className='flex text-lg text-[#02457A] cursor-pointer hover:text-[#02457A]/75' href={expense.fileUrl || ''} target='_blank'><span className='text-sm font-semibold text-[#02457A]/90'>File: </span><FiFileText  className='mx-1'/></a>
              </div>

              <div className='flex gap-3 items-center text-lg text-right'>
                <button className='text-[#02457A] hover:text-[#02457A]/75 cursor-pointer' onClick={() => { handleModal('Edit'); getExpenseToEdit(expense); }}><MdOutlineModeEdit /></button>
                <button className='text-[#02457A] hover:text-[#02457A]/75 cursor-pointer'><FiDownload /></button>
                <button className='text-[#02457A] hover:text-red-700 cursor-pointer' onClick={() => deleteExpense(expense)}><MdDeleteOutline /></button>
                <IoIosArrowUp className='text-lg text-[#02457A] hover:text-[#02457A]/75 cursor-pointer bg-[#02457A]/10 p-0.5 rounded-sm text-center' onClick={() => setIndexOpen(null)}/>
              </div>
                

            </div>
            </div>
            </>
            :
            <>
            <div key={index} className='flex md:hidden justify-between items-center px-1 py-1.5 text-left border-b-2 border-[#02457A]/30 text-[13px]'>
                <div className='w-35/100 font-semibold text-[#02457A]/90'>{expense.icon} {expense.name}</div>
                <div className='w-1/4 text-[#02457A]/70 text-xs'>{expense.date}</div>
                <div className='w-1/4 font-bold text-red-700 flex items-center gap-1'>₹{expense.amount}<IoIosTrendingDown /></div>
                <IoIosArrowDown className='text-lg text-[#02457A] hover:text-[#02457A]/75 cursor-pointer bg-[#02457A]/10 p-0.5 rounded-sm text-center' onClick={() => setIndexOpen(index)}/>
            </div>
            </>
        ))}

      </div>

      {openModal && <Modal 
      type={type}
      title={`${modal} ${type}`}
      closeModal={() => setOpenModal(!openModal)}
      getExpenses={getExpenses}
      expenseToEdit={expenseToEdit}
      />}
    </div>
  )
}

export default ExpenseHistory

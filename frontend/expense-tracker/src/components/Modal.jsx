import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import InputBox from './Inputs/InputBox';
import IconSelector from './Inputs/IconSelector';
import { FiUploadCloud } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const Modal = ({ type, closeModal, title, getExpenses, expenseToEdit }) => {

  const [icon, setIcon] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if(expenseToEdit) {
    setIcon(expenseToEdit.icon)
    setCategory(expenseToEdit.category)
    setName(expenseToEdit.name)
    setAmount(expenseToEdit.amount)
    setDate(expenseToEdit.date)
    setFile(expenseToEdit.fileUrl)
    }
  },[expenseToEdit])

  const uploadImage = async (url,file) => {
    try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosInstance.post(url, formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    })
    return response.data;
    } catch(error) {
      console.log(error);
    }
  }

  const clearFields = () => {
    setIcon('');
    setCategory('');
    setName('');
    setAmount('');
    setDate(new Date());
    setFile(null);
    setError('');
  }

  const addExpense = async () => {
    if(!name) {
      setError(`${type=='Income' || type=='Savings'?'Source':'Reciever'} is required`);
      return;
    }
    if(!amount) {
      setError('Amount is required');
      return;
    }
    if(!date) {
      setError('Date is required');
      return;
    }

    try {
      let fileUrl = '';
      if(file && typeof file !=='string' ) {
        const res = await uploadImage('/upload',file);
        fileUrl = res.fileUrl;
      }
      const response = await axiosInstance.post(`/api/${type.toLowerCase()}/add`, {
        icon,
        category,
        name,
        amount: Number(amount),
        date,
        fileUrl,
      })
      if(response.data && response.data.message) {
        closeModal();
        toast.success(response.data.message, {
          duration: 1000,
        });
        setTimeout(() => {
        getExpenses();
        },300);
      }
    } catch(error) {
     console.log('Server Error');
    }
  }

  const editExpense = async () => {

    if(!name) {
      setError(`${type=='Income' || type=='Savings'?'Source':'Reciever'} is required`);
      return;
    }
    if(!amount) {
      setError('Amount is required')
      return;
    }
      
    if(!date) {
      setError('Date is required')
      return;
    }

    const { _id } = expenseToEdit;

    try {
      let fileUrl= file;
      if(file && typeof file !== 'string') {
        const res = await uploadImage('/upload',file);
        fileUrl = res.fileUrl;
      }
      const response = await axiosInstance.put(`/api/${type.toLowerCase()}/edit/${_id}`,{
        icon,
        category,
        name,
        amount: Number(amount),
        date,
        fileUrl,
      });
      if(response.data && response.data.message) {
        toast.success(response.data.message,{
          duration: 1000,
        });
        setTimeout(() => {
          closeModal();
          getExpenses();
        },300)
      }
    } catch(error) {
      console.log('Server Error');
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/50'>
      <div className='w-[85vw] md:w-[33vw] max-h-[88vh] bg-white overflow-y-auto rounded-xl shadow-md shadow-gray-700/50'>
        <div className='flex justify-between items-center py-2.5 md:py-3 px-4.5 md:px-5 border-b-2 border-[#02457A]/50'>
            <div className='flex flex-col'>
            <h3 className='text-semibold text-[#02457A] md:text-lg font-semibold'>{title}</h3>
            <p className='text-[13px] md:text-sm tracking-wide text-[#02457A]/60'>Fill in the {type.toLowerCase()} details</p>
            </div>
            <button className='bg-[#02457A]/5 text-[#02457A] hover:bg-[#02457A] hover:text-white rounded-md p-1.5 md:p-2 cursor-pointer' onClick={closeModal}><AiOutlineClose/></button>
        </div>

        <div className=''>
        <IconSelector icon={icon} setIcon={setIcon}/>
        <div className='grid grid-cols-2 gap-5 md:gap-7 px-4 md:px-5 py-2 md:py-3'>
            <InputBox title='Category' eg={type==='Expense'?'Food':(type==='Income'?'Salary':'Investment')} type='text' value={category} setValue={setCategory}/>
            <InputBox title={`${(type==='Income' || type==='Savings')?'Source':'Reciever'}`} eg={type==='Expense'?'Starbucks':(type==='Income'?'Wipro':'Stocks')} type='text' value={name} setValue={setName}/>
            <InputBox title='Amount' eg='1000' type='text' value={amount} setValue={setAmount}/>
            <InputBox title='Date' eg={`${new Date()}`} type='Date' value={date} setValue={setDate}/>
        </div>
        <input type='file' id='fileInput' className='hidden' onChange={(e) => setFile(e.target.files[0])}/>
        <button className='w-875/1000 md:w-11/12 max-h-full border-2 border-dashed border-[#02457A]/40 flex flex-col items-center justify-center gap-2 md:gap-3 m-5 mb-4 px-4 py-6 text-[#02457A] rounded-xl cursor-pointer' onClick={() => document.getElementById('fileInput').click()}>
            {((typeof file === 'string') || (file && typeof file === 'object' && file.type && (file.type.startsWith('image/'))))?
            <div className='flex gap-1'>
            <img src={typeof file === 'string'? file: URL.createObjectURL(file)} alt='selected file' className='h-[90px] md:h-[100px] rounded-lg'/>
            {/* <button className='bg-[#02457A]/5 text-[#02457A] hover:bg-[#02457A] hover:text-white text-xl rounded-lg flex justify-center items-center cursor-pointer'><AiOutlineClose/></button> */}
            </div>
            :
            <>
            <FiUploadCloud className='text-xl text-[#02457A]/70'/>
            <p className='text-[13px] md:text-sm font-bold '>Upload a file such as an Invoice</p>
            <p className='text-[13px] md:text-sm text-[#02457A]/80'>or <span className='underline'>Click to browse</span></p>
            </>}
        </button>
        {error && <p className='text-[12px] md:text-[13px] px-5 tracking-wide text-red-700'>*{error}</p>}
        <div className='flex gap-2 justify-end items-center mx-5 mb-4'>
            <button className='text-[13px] md:text-sm text-[#02457A] font-bold px-3 md:px-4 py-1 md:py-1.5 border-[2px] border-[#02457A]/40 rounded-md cursor-pointer' onClick={clearFields}>Clear</button>
            <button className='text-[13px] md:text-sm text-white font-bold px-3 md:px-4 py-1.5 md:py-2 bg-[#02457A] rounded-md flex justify-center items-center gap-1 md:gap-2 cursor-pointer' onClick={(title==='Add Expense' || title==='Add Income' || title==='Add Savings')?addExpense:editExpense}>Done <IoMdCheckmarkCircleOutline className='text-[16px]'/></button>
        </div>
        </div>

      </div>
    </div>
    )
}

export default Modal

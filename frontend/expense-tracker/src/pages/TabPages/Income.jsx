import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Layouts/DashboardLayout'
import { FaDownload } from "react-icons/fa6";
import IncomeExpenseChart from '../../components/layers/Overview/IncomeExpenseChart';
import ExpenseHistory from '../../components/Table/ExpenseHistory';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import IncomeExpenseStats from '../../components/Inputs/IncomeExpenseStats';

const Income = () => {

  const [incomeData, setIncomeData] = useState(null);
  const [oldIncomeData, setOldIncomeData] = useState(null);

  const getIncome = async () => {
    try {
    const response = await axiosInstance.get('/api/income/get-all');
    if(response.data) {
        setIncomeData(response.data.formatUserIncomes);
        setOldIncomeData(response.data.formatOldUserIncomes);
    }
    } catch(error) {
        console.log('Server Error');
    }
  }

  const deleteIncome = async (income) => {
    const id = income._id;

    try {
       const response = await axiosInstance.delete(`/api/income/delete/${id}`);
       if(response.data && response.data.message) {
        toast.success(response.data.message,{
          duration:500
        })
        getIncome();
       }
    } catch(error) {
        console.log('Server Error',error)
    }
  }

  useEffect(() => {
    getIncome();
  },[])

  const printReport = () => {}

  return (
    <div className='flex flex-col gap-5 md:gap-6'>
        <div className='text-[#02457A]/90 bg-white mt-1.5 md:mt-0 p-2 md:p-3 rounded-xl flex justify-between items-center'>
          <h3 className='md:text-lg px-1.5 font-semibold'>Earnings</h3>
          <button className='flex gap-2 justify-center items-center bg-[#02457A]/90 text-white px-2 md:px-3 py-1 md:py-2 text-sm rounded-md cursor-pointer tracking-wide' onClick={() => printReport()}>Print<FaDownload/></button>
        </div>

        <div className='hidden rounded-xl p-2 md:flex flex-col md:flex-row gap-8'>
          <IncomeExpenseChart type='Income'/>
          <IncomeExpenseStats type='Income'/>
        </div>

        <div className='md:hidden rounded-xl p-2 flex flex-col md:flex-row gap-8'>
          <IncomeExpenseStats type='Income'/>
          <IncomeExpenseChart type='Income'/>
        </div>


        <ExpenseHistory type='Income' expenseData={incomeData} oldExpenseData={oldIncomeData} getExpenses={getIncome} deleteExpense={deleteIncome} />

    </div>
  )
}

export default Income

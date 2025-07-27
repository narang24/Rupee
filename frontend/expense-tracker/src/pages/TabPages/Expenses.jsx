import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Layouts/DashboardLayout'
import { FaDownload } from "react-icons/fa6";
import IncomeExpenseChart from '../../components/layers/Overview/IncomeExpenseChart';
import ExpenseHistory from '../../components/Table/ExpenseHistory';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import IncomeExpenseStats from '../../components/Inputs/IncomeExpenseStats';

const Expenses = () => {

  const [expenseData, setExpenseData] = useState(null);
  const [oldExpenseData, setOldExpenseData] = useState(null);

  const getExpenses = async () => {
    try {
    const response = await axiosInstance.get('/api/expense/get-all');
    if(response.data) {
        setExpenseData(response.data.formatUserExpenses);
        setOldExpenseData(response.data.formatOldUserExpenses);
    }
    } catch(error) {
        console.log('Server Error');
    }
  }

  const deleteExpense = async (expense) => {
    const id = expense._id;

    try {
       const response = await axiosInstance.delete(`/api/expense/delete/${id}`);
       if(response.data && response.data.message) {
        toast.success(response.data.message,{
          duration:500
        })
        getExpenses();
       }
    } catch(error) {
        console.log('Server Error',error)
    }
  }

  useEffect(() => {
    getExpenses();
  },[])

  const printReport = () => {}

  return (
    <div className='flex flex-col gap-5 md:gap-6'>
        <div className='text-[#02457A]/90 bg-white mt-1.5 md:mt-0 p-2 md:p-3 rounded-xl flex justify-between items-center'>
          <h3 className='md:text-lg px-1.5 font-semibold'>Expenditure</h3>
          <button className='flex gap-2 justify-center items-center bg-[#02457A]/90 text-white px-2 md:px-3 py-1 md:py-2 text-sm rounded-md cursor-pointer tracking-wide' onClick={() => printReport()}>Print<FaDownload/></button>
        </div>

        <div className='hidden rounded-xl p-2 md:flex flex-col md:flex-row gap-8'>
          <IncomeExpenseChart type='Expense'/>
          <IncomeExpenseStats type='Expenses'/>
        </div>

        <div className='md:hidden rounded-xl p-2 flex flex-col md:flex-row gap-8'>
          <IncomeExpenseStats type='Expenses'/>
          <IncomeExpenseChart type='Expense'/>
        </div>


        <ExpenseHistory type='Expense' expenseData={expenseData} oldExpenseData={oldExpenseData} getExpenses={getExpenses} deleteExpense={deleteExpense} />

    </div>
  )
}

export default Expenses

import React, { useEffect, useRef, useState } from 'react'
import { FaDownload } from "react-icons/fa6";
import IncomeExpenseChart from '../../components/layers/Overview/IncomeExpenseChart';
import ExpenseHistory from '../../components/Table/ExpenseHistory';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import SavingsBox from '../../components/layers/Overview/SavingsBox';
import { useReactToPrint } from 'react-to-print';

const Savings = () => {

  const contentRef = useRef();

  const [savingsData, setSavingsData] = useState(null);
  const [oldsavingsData, setOldSavingsData] = useState(null);

  const getSavings = async () => {
    try {
    const response = await axiosInstance.get('/api/savings/get-all');
    if(response.data) {
        setSavingsData(response.data.formatUserSavings);
        setOldSavingsData(response.data.formatOldUserSavings);
    }
    } catch(error) {
        console.log('Server Error');
    }
  }

  const deleteSaving = async (saving) => {
    const id = saving._id;

    try {
       const response = await axiosInstance.delete(`/api/savings/delete/${id}`);
       if(response.data && response.data.message) {
        toast.success(response.data.message,{
          duration:500
        })
        getSavings();
       }
    } catch(error) {
        console.log('Server Error',error)
    }
  }

  useEffect(() => {
    getSavings();
  },[])

  const isDataReady = savingsData !== null && oldsavingsData !== null;

  const printReport = useReactToPrint({
    content: () => contentRef.current,
    documentTitle: `Savings-report`,
  })

  return (
    <div className='flex flex-col gap-5 md:gap-6'>
        <div className='text-[#02457A]/90 bg-white mt-1.5 md:mt-0 p-2 md:p-3 rounded-xl flex justify-between items-center'>
          <h3 className='md:text-lg px-1.5 font-semibold'>Savings</h3>
          <button className='flex gap-2 justify-center items-center bg-[#02457A]/90 text-white px-2 md:px-3 py-1 md:py-2 text-sm rounded-md cursor-pointer tracking-wide' onClick={() => printReport()} disabled={!isDataReady}>Print<FaDownload/></button>
        </div>

        <div ref={contentRef} className='hidden rounded-xl p-2 md:flex flex-col md:flex-row gap-8'>
          <IncomeExpenseChart type='Savings'/>
          <SavingsBox/>
        </div>

        <div className='md:hidden rounded-xl p-2 flex flex-col md:flex-row gap-8'>
          <SavingsBox/>
          <IncomeExpenseChart type='Savings'/>
        </div>


        <ExpenseHistory type='Savings' expenseData={savingsData} oldExpenseData={oldsavingsData} getExpenses={getSavings} deleteExpense={deleteSaving} />

    </div>
  )
}

export default Savings

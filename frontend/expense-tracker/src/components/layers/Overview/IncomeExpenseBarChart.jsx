import React, { useState } from 'react'
import BigBarChart from '../../Charts/BigBarChart';

const IncomeExpenseBarChart = () => {

  const [option, setOption] = useState('six');

  return (
    <div className='text-[#02457A] bg-white w-full md:w-55/100 rounded-xl p-5 shadow-md hover:shadow-lg shadow-gray-300'>
      <div className='flex justify-between items-center'>
      <div className='font-semibold outline-none cursor-pointer'>
        Income Vs Expenses
      </div>
      <select onChange={(e) => setOption(e.target.value)} className='text-[#02457A]/80 text-xs md:text-sm p-1 rounded-md border-[1px] border-[#02457A]/60 outline-none cursor-pointer'>
        <option value='six'>Last 6 months</option>
        <option value='one'>Last year</option>
      </select>
      </div>
      <BigBarChart value={option} />
    </div>
  )
}

export default IncomeExpenseBarChart

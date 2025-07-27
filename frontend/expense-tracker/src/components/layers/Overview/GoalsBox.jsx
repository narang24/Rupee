import React from 'react'
import CategoryPieChart from '../../Charts/CategoryPieChart'

const GoalsBox = () => {
  return (
    <div className='relative -z-10 flex-1 text-[#02457A] bg-white rounded-xl p-5 shadow-md hover:shadow-lg shadow-gray-300'>
      <div className='flex justify-between items-center'>
      <div className='text-[#02457A]/90 text-md font-semibold'>Activity</div>
      {/* <select className='text-[#02457A]/80 text-xs md:text-sm p-1 rounded-md border-[1px] border-[#02457A]/60 outline-none cursor-pointer'>
        <option selected>Last 6 months</option>
        <option>Last month</option>
      </select> */}
      </div>
      <CategoryPieChart type='Income'/>
    </div>
  )
}

export default GoalsBox

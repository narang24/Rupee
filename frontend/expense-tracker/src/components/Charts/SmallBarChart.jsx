import React from 'react'
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const SmallBarChart = ({ data }) => {
    const colors=['#02457A','#018ABE']
  return (
    <div className='h-full w-full flex justify-between mr-6'>
      <div className='px-2 pb-6 pt-3 md:pt-1 md:pb-1 flex flex-col md:gap-4'>

        <div>
          <p className='text-[#02457A] md:text-lg font-light'>&#x20B9;{data[0].value}</p>
          <p className='flex items-center text-[#02457A] font-semibold gap-1.5 text-sm'><div className={`h-1 w-1 rounded-full bg-[#02457A]`}></div>Income</p>
        </div>
        <div>
          <p className='text-[#018ABE] md:text-lg font-light'>&#x20B9;{data[1].value}</p>
          <p className='flex items-center text-[#018ABE] font-semibold gap-1.5 text-sm'><div className={`h-1 w-1 rounded-full bg-[#018ABE]`}></div>Expenses</p>
        </div>
          
      </div>
      <ResponsiveContainer height='100%' width='60%'>
        <BarChart data={data}>
            <XAxis dataKey='name' className='hidden'/>
            <YAxis className='hidden'/>
            <Bar dataKey='value' radius={[8,8,8,8]} barSize={7} >
                {data.map((item,index) => (
                    <Cell key={index} fill={colors[index]}/>
                ))}
            </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SmallBarChart

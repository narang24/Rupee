import React, { useState } from 'react'
import { useLineGraphData } from '../../utils/data';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const BigBarChart = ({ value }) => {
    const incomeData = useLineGraphData('income', value);
    const expenseData = useLineGraphData('expense', value);
    const data = (incomeData.length>0 && expenseData.length>0)?
    incomeData.map((income,index) => ({ 
        month: income.month, 
        income: income.income, 
        expense: expenseData[index].expense,
    })):[];

    const CustomTooltip = ({ active, payload }) => {
        if(active && payload && payload.length) {
            const item = payload[0];
            const { name, value, color } = item;

            return(
                <div className={`px-2 py-1 text-white rounded-lg `} style={{backgroundColor: color}}>
                    ₹ {value}
                </div>
            );
        }
    }
 
  return (
    <div>
      <ResponsiveContainer width='100%' height={300} className=''>
        <BarChart data={data} barGap={10} margin={{top:25, right:30, bottom:-13, left:0}}>
            <XAxis dataKey='month' axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => val==0?0: `₹${val}`}/>
            <Tooltip content={<CustomTooltip/>} shared={false}/>
            <Legend
            verticalAlign='bottom'
            align='center'
            iconType='plainline'
            iconSize={0}
            formatter={
            (val) => {
                const color = val==='income'?'#02457A':'#018ABE';
                const label = val==='income'?'Income':'Expense';
                return (
                    <span style={{display:'flex', justifyContent: 'center', alignItems: 'center', gap:8, margin:10 }}>
                        <span style={{height:14, width:25, backgroundColor: color, borderRadius: 4}}/>
                        <span style={{color:color,fontSize:15, fontWeight:600}}>{label}</span>
                    </span>
                )
            }}
            />
            <Bar dataKey='income' fill='#02457A' radius={[5,5,0,0]} barSize={12} isAnimationActive={false} activeBar={false}/>
            <Bar dataKey='expense' fill='#018ABE' radius={[5,5,0,0]} barSize={12} isAnimationActive={false} activeBar={false}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BigBarChart

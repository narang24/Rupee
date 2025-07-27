import React from 'react'
import { Cell, Pie, PieChart } from 'recharts'
import { useStatsData } from '../../utils/data';

const CategoryPieChart = ({ type }) => {
    const colors=['#02457A','#017397','#0dbacc','#018ABE','#008080'];

    const { data } = useStatsData();
    const { categoryIncomeAgg, categoryExpenseAgg, totalIncome, totalExpense } = data;
    const chartData = (type==='Expense')?(categoryExpenseAgg && categoryExpenseAgg.map((item,index) => ({
      name: item.category,
      value: item.total,
      color: colors[index%(colors.length)],
    }))):
    (categoryIncomeAgg && categoryIncomeAgg.map((item,index) => ({
      name: item.category,
      value: item.total,
      color: colors[index%(colors.length)],
    })))
    const total = (type==='Expense')?(totalExpense||0):(totalIncome || 0);

  return (
    <div className='flex justify-center items-center gap-4'>
      <PieChart height={300} width={260}>
        <Pie 
        data={chartData}
        dataKey='value'
        outerRadius={100}
        innerRadius={87}
        startAngle={90}
        endAngle={-270}
        cornerRadius={15}
        paddingAngle={2}
        >
            {chartData && chartData.map((item,index) => (
                <Cell key={index} fill={item.color} />
            ))}
        </Pie>
        <text x='50%' y='50%' textAnchor='middle' dominantBaseline='middle' fontWeight='semibold' fill='#02457A'>
          <tspan x='49%' y='50%' fontSize={24}>₹ {total.toString().split(".")[0].toLocaleString('en-IN')}.{total.toString().split(".")[1] || '00'}</tspan>
          <tspan x='50%' y='58%'fontSize={16} opacity={0.85}>{type==='Expense'?'Spent':'Earned'}</tspan>
        </text>
      </PieChart>

      <div className='flex-1 flex flex-col gap-5'>
        {chartData && chartData.map((item, index) => {
            return(
                <div key={index} className='flex gap-3 items-center'>
                    <span className='h-1.5 w-1.5 rounded-full inline-block' style={{backgroundColor: item.color}}></span>
                    <div className='flex w-4/5 md:w-3/4 justify-between'>
                    <p className='text-[15px]'>{item.name}</p>
                    <p className='text-[15px] font-semibold'>{Math.round(item.value/total*100)}%</p>
                    </div>
                </div>
            )
        })}
      </div>

    </div>
  )
}

export default CategoryPieChart

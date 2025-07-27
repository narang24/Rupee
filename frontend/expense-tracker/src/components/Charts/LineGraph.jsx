import React from 'react'
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useLineGraphData } from '../../utils/data'

const CustomLineDot = ({ cx, cy, payload, type }) => {
  if(cx && cy) {
    return(
      <g>
        {/* Vertical Dotted Line */}
        <line 
          x1={cx}
          y1={cy}
          x2={cx}
          y2={247}
          stroke='#02457A'
          strokeWidth={1.5}
          strokeDasharray='5'
        />
        {/* Dot */}
        <circle cx={cx} cy={cy} r={8} fill='#02457A' stroke='#fff' strokeWidth={3}/>

        {/* Tooltip text */}
        <text fontSize='14' x={cx} y={cy-15} textAnchor="middle" fill="#02457A"><tspan fontWeight='700' fontSize='14' letterSpacing='0.025em'>₹ {(type==='expense'?payload.expense:payload.income).toString().split(".")[0].toLocaleString('en-IN')}</tspan><tspan fontWeight='600' fontSize='12'>.{(type==='expense'?payload.expense:payload.income).toString().split(".")[1] || '00'}</tspan></text>

      </g>
    )
  }
}


const LineGraph = ({ type, value }) => {
    const data = useLineGraphData(type,value);

  return (
    <div className='pt-5'>
      <ResponsiveContainer width='97%' height={280}>
        <AreaChart data={data}>

      <defs>
        <linearGradient id='colorIncome' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#02457A' stopOpacity={0.2}/>
          <stop offset='100%' stopColor='#02457A' stopOpacity={0}/>
        </linearGradient>
      </defs>
            <CartesianGrid stroke='#e5e7eb' vertical={false} />
            <XAxis dataKey='month' axisLine={false} tickLine={false}/>
            <YAxis domain={[0, 'auto']} axisLine={false} tickLine={false} tickFormatter={(val) => val===0?'':val}/>
            <Tooltip content={() => null} cursor={false}/>
            <Area type="monotone" dataKey={type} stroke="#ffffff" strokeWidth={3} fill="none" dot={false} activeDot={false}/>
            <Area type='monotone' dataKey={type} stroke='#02457A' strokeWidth={3} dot={{r:0}} activeDot={<CustomLineDot type={type}/>} fillOpacity={1} fill='url(#colorIncome)'/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineGraph

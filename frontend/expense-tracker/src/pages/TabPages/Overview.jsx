import React from 'react'
import DashboardLayout from '../Layouts/DashboardLayout'
import SummaryLayer from '../../components/layers/Overview/SummaryLayer'
import CategoryIncomeExpense from '../../components/layers/Overview/CategoryIncomeExpense'
import IncomeExpenseBarChart from '../../components/layers/Overview/IncomeExpenseBarChart'
import IncomeExpenseGraph from '../../components/layers/Overview/IncomeExpenseGraph'
import GoalsBox from '../../components/layers/Overview/GoalsBox'

const Overview = () => {
  return (
        <div>
          <SummaryLayer />
          <div className='my-7 flex flex-col md:flex-row gap-7'>
            <IncomeExpenseBarChart/>
            <CategoryIncomeExpense/>
          </div>
          <div className='my-7 flex flex-col md:flex-row gap-7'>
            <IncomeExpenseGraph/>
            <GoalsBox/>
          </div>
          
        </div>
  )
}

export default Overview

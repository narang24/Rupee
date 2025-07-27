import { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance"

export const useCardsData = () => {

const [cardsData, setCardsData] = useState([]);
const [loading, setLoading] = useState(true);

const getTotals = async () => {
    try {
        const response = await axiosInstance.get('/api/overview/totals');
        const data = response.data;

        //Getting Card's Data
        const balance = data.totalIncome - data.totalExpense;
        const oneMonthBalance = data.oneMonthTotalIncome - data.oneMonthTotalExpense;
    
        const percentChange = (sum, oneMonthSum) => {
            if(oneMonthSum == 0) return 0;
            return Math.round((sum-oneMonthSum)/oneMonthSum*100*100)/100;
        }

        const cards = [
            {
                icon: 'wallet',
                color1: '#017397',
                color2: '#3BA8C2',
                name: 'Total Balance',
                value: balance,
                percent: percentChange(balance, oneMonthBalance)
            },
            {
                icon: 'hand-holding-dollar',
                color1: '#018ABE',
                color2: '#69ADFF',
                name: 'Total Income',
                value: data.totalIncome,
                percent: percentChange(data.totalIncome, data.oneMonthTotalIncome)
            },
            {
                icon: 'sack-dollar',
                color1: '#0E7C86',
                color2: '#3FA1AA',
                name: 'Total Expenses',
                value: data.totalExpense,
                percent: percentChange(data.totalExpense, data.oneMonthTotalExpense)
            },
            {
                icon: 'piggy-bank',
                color1: '#0dbacc',
                color2: '#B4F1F1',
                name: 'Total Savings',
                value: data.totalSaving,
                percent: percentChange(data.totalSaving, data.oneMonthTotalSaving)
            }
        ];

        setCardsData(cards);
    } catch(error) {
        console.log('Error Occurred',error);
    } finally {
        setLoading(false);
    }
}

useEffect(() => {
    getTotals();
},[]);

return {cardsData, loading};

}

export const useStatsData = () => {
    const [data, setData] = useState({
        totalIncome: 0, 
        totalExpense: 0, 
        categoryIncomeAgg: 0, 
        categoryExpenseAgg: 0,
        oneMonthTotalIncome: 0,
        oneMonthTotalExpense: 0,
        sixMonthsTotalIncome: 0,
        sixMonthsTotalExpense: 0,
    });

    const getGraphTotals = async () => {
    try {
        const response = await axiosInstance.get('/api/overview/totals');
        if(response.data) {
            setData({
                totalIncome: response.data.totalIncome, 
                totalExpense: response.data.totalExpense, 
                categoryIncomeAgg: response.data.categoryIncomeAgg, 
                categoryExpenseAgg: response.data.categoryExpenseAgg,
                oneMonthTotalIncome: response.data.oneMonthTotalIncome,
                oneMonthTotalExpense: response.data.oneMonthTotalExpense,
                sixMonthsTotalIncome: response.data.sixMonthsTotalIncome,
                sixMonthsTotalExpense: response.data.sixMonthsTotalExpense,
            });
        }
    } catch(error) {
        console.log(error);
    }
    }

    useEffect(() => {
        getGraphTotals();
    },[])

    return {data};
}

export const useLineGraphData = (type, value) => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const lastYear = [];
    const now = new Date();

    for(let i=11; i>=0; i--) {
        const date = new Date(now.getFullYear(),now.getMonth()-i,1);
        lastYear.push(months[date.getMonth()]);
    }
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const [graphData, setGraphData] = useState([]);


    const getTotals = async () => {
    try {
        const response = await axiosInstance.get('/api/overview/totals');
        if(response.data) {
        const newExpenseData=lastYear.map(month => ({ month, expense:0 }));
        const newIncomeData=lastYear.map(month => ({ month, income:0 }));

        response.data.expenseAllMonthsTotals.forEach((item) => {
        const monthName = months[item.month-1];
        const entry = newExpenseData.find(d => d.month === monthName);
        if(entry) entry.expense = item.total;
        })

        response.data.incomeAllMonthsTotals.forEach((item) => {
        const monthName = months[item.month-1];
        const entry = newIncomeData.find(d => d.month === monthName);
        if(entry) entry.income = item.total;
        })

        setExpenseData(newExpenseData);
        setIncomeData(newIncomeData);
        }

    } catch(error) {
        console.log(error);
    }
    }

    useEffect(() => {
        getTotals();
    },[])

    useEffect(() => {
        if(type==='income') {
        if(value=='one')
            setGraphData(incomeData);
        else
            setGraphData(incomeData.slice(-6));
        } else if(type==='expense') {
        if(value=='one')
            setGraphData(expenseData);
        else
            setGraphData(expenseData.slice(-6));
        }

        
    },[type,value,incomeData,expenseData])
    
    return graphData;
}
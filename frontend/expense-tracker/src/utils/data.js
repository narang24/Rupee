import { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance"

export const useCardsData = () => {

const [cardsData, setCardsData] = useState([]);
const [loading, setLoading] = useState(true);

const getTotals = async () => {
    try {
        const expenseResponse = await axiosInstance.get('/api/overview/expenseTotals');
        const incomeResponse = await axiosInstance.get('/api/overview/incomeTotals');
        const savingsResponse = await axiosInstance.get('/api/overview/savingsTotals');

        const expenseData = expenseResponse.data;
        const incomeData = incomeResponse.data;
        const savingsData = savingsResponse.data;

        //Getting Card's Data
        const balance = incomeData.totalIncome - expenseData.totalExpense;
        const oneMonthBalance = incomeData.oneMonthTotalIncome - expenseData.oneMonthTotalExpense;
    
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
                value: incomeData.totalIncome,
                percent: percentChange(incomeData.totalIncome, incomeData.oneMonthTotalIncome)
            },
            {
                icon: 'sack-dollar',
                color1: '#0E7C86',
                color2: '#3FA1AA',
                name: 'Total Expenses',
                value: expenseData.totalExpense,
                percent: percentChange(expenseData.totalExpense, expenseData.oneMonthTotalExpense)
            },
            {
                icon: 'piggy-bank',
                color1: '#0dbacc',
                color2: '#B4F1F1',
                name: 'Total Savings',
                value: savingsData.totalSavings,
                percent: percentChange(savingsData.totalSavings, savingsData.oneMonthTotalSavings)
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
        const expenseResponse = await axiosInstance.get('/api/overview/expenseTotals');
        const incomeResponse = await axiosInstance.get('/api/overview/incomeTotals');

        if(expenseResponse.data && incomeResponse.data) {
            setData({
                totalIncome: incomeResponse.data.totalIncome, 
                totalExpense: expenseResponse.data.totalExpense, 
                categoryIncomeAgg: incomeResponse.data.categoryIncomeAgg, 
                categoryExpenseAgg: expenseResponse.data.categoryExpenseAgg,
                oneMonthTotalIncome: incomeResponse.data.oneMonthTotalIncome,
                oneMonthTotalExpense: expenseResponse.data.oneMonthTotalExpense,
                sixMonthsTotalIncome: incomeResponse.data.sixMonthsTotalIncome,
                sixMonthsTotalExpense: expenseResponse.data.sixMonthsTotalExpense,
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
        const expenseResponse = await axiosInstance.get('/api/overview/expenseTotals');
        const incomeResponse = await axiosInstance.get('/api/overview/incomeTotals');

        if(expenseResponse.data && incomeResponse.data) {
        const newExpenseData=lastYear.map(month => ({ month, expense:0 }));
        const newIncomeData=lastYear.map(month => ({ month, income:0 }));

        expenseResponse.data.expenseAllMonthsTotals.forEach((item) => {
        const monthName = months[item.month-1];
        const entry = newExpenseData.find(d => d.month === monthName);
        if(entry) entry.expense = item.total;
        })

        incomeResponse.data.incomeAllMonthsTotals.forEach((item) => {
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

export const useSavingsGraphData = (value) => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const lastYear = [];
    const now = new Date();
    
    for(let i=11;i>=0;i--) {
        const month = new Date(now.getFullYear(), now.getMonth()-i, 1);
        lastYear.push({ month: months[month.getMonth()], savings: 0 });
    }

    const [graphData, setGraphData] = useState([]);
    const [savingsData, setSavingsData] = useState([]);

    const getData = async () => {
        const response = await axiosInstance.get('/api/overview/savingsTotals');

        if(response.data) {
            setSavingsData(response.data.savingAllMonthsTotals);
        }
    }

    const setData = () => {
        if(savingsData.length>0) {
            savingsData.forEach((item) => {
                const entry = lastYear.find(d => d.month == months[item.month-1])
                if(entry) {
                entry.savings = item.total
                }
            })
        }
    }

    useEffect(() => {
        getData();
    },[]);

    useEffect(() => {
        setData();
        if(value==='six')
            setGraphData(lastYear.slice(-6));
        else
            setGraphData(lastYear);
    },[savingsData, value])

    return graphData;
}
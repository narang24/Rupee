const mongoose = require("mongoose");
const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Savings } = require('../models/Savings')

exports.getExpenseTotals = async (req, res) => {
    const userId = req.user.id;

    try {
        //Total Expense
        const totalExpenseAgg = await Expense.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId)}},
            {$group: {_id: null, total: { $sum: '$amount' }}}
        ])

        const totalExpense = totalExpenseAgg[0]?.total || 0;

        const now = new Date();
        const oneMonthAgo = new Date();
        const sixMonthsAgo = new Date();

        oneMonthAgo.setMonth(now.getMonth()-1);
        sixMonthsAgo.setMonth(now.getMonth()-6);

        //Total Income & Expense (one month ago)

        const oneMonthTotalExpenseAgg = await Expense.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId), date: { $gte: oneMonthAgo }}},
            {$group: {_id:null, total: { $sum: '$amount' }}}
        ])

        const oneMonthTotalExpense = oneMonthTotalExpenseAgg[0]?.total || 0;

        //Total Income & Expense (six months ago)

        const sixMonthsTotalExpenseAgg = await Expense.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId), date: {$gte: sixMonthsAgo}}},
            {$group: {_id: null, total: {$sum: '$amount'}}}
        ])

        const sixMonthsTotalExpense = sixMonthsTotalExpenseAgg[0]?.total || 0;

        // Category-wise totals
        
        const categoryExpenseAgg = await Expense.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId)}},
            {$group: {_id: '$category', total: { $sum: '$amount' }}},
            {$project: {_id:0, category: '$_id', total:1}}
        ])

        const twelveMonthsAgo = new Date(now.getFullYear(),now.getMonth()-11,1);

        //Monthly Totals
        const expenseAllMonthsTotals = await Expense.aggregate([
            { $match: {userId: new mongoose.Types.ObjectId(userId), date: {$gte: twelveMonthsAgo}}},
            { $group: {_id: { year: {$year: '$date'}, month: {$month: '$date'}}, total: {$sum: '$amount' }}},
            { $sort: { '_id.year':1, '_id.month':1 }},
            { $project: {_id: 0, month: '$_id.month', year: '$_id.year', total: 1 }}
        ])

        res.json({ 
            totalExpense,
            categoryExpenseAgg,
            oneMonthTotalExpense,
            sixMonthsTotalExpense,
            expenseAllMonthsTotals,
        });

    } catch(error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.getIncomeTotals = async (req, res) => {
    const userId = req.user.id;

    try {

        //Total Income
        const totalIncomeAgg = await Income.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId)}},
            {$group: {_id: null, total: { $sum: '$amount' }}}
        ])

        const totalIncome = totalIncomeAgg[0]?.total || 0;

        //Total Income One Month Ago
        const now = new Date();
        const oneMonthAgo = new Date();
        const sixMonthsAgo = new Date();

        oneMonthAgo.setMonth(now.getMonth()-1);
        sixMonthsAgo.setMonth(now.getMonth()-6);

        const oneMonthTotalIncomeAgg = await Income.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId), date: { $gte: oneMonthAgo }}},
            {$group: {_id:null, total: { $sum: '$amount' }}}
        ])

        const oneMonthTotalIncome = oneMonthTotalIncomeAgg[0]?.total || 0;

        //Total Income Six Months Ago
        const sixMonthsTotalIncomeAgg = await Income.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId), date: {$gte: sixMonthsAgo}}},
            {$group: {_id:null, total: {$sum: '$amount'}}}
        ])

        const sixMonthsTotalIncome = sixMonthsTotalIncomeAgg[0]?.total || 0;

        //Category-wise Totals
        const categoryIncomeAgg = await Income.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId)}},
            {$group: {_id: '$category', total: { $sum: '$amount' }}},
            {$project: {_id:0, category: '$_id', total:1}}
        ])

        const twelveMonthsAgo = new Date(now.getFullYear(),now.getMonth()-11,1);

        //Monthly Totals
        const incomeAllMonthsTotals = await Income.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId), date: {$gte: twelveMonthsAgo}}},
            {$group: {_id: {year: {$year: '$date'}, month: {$month: '$date'}}, total: {$sum: '$amount'}}},
            {$sort: { '_id.year':1, '_id.month':1 }},
            {$project: { _id:0, month: '$_id.month', year: '$_id.year', total:1 }},
        ])

        res.json({ 
            totalIncome,  
            categoryIncomeAgg, 
            oneMonthTotalIncome,
            sixMonthsTotalIncome,
            incomeAllMonthsTotals,
        });


    } catch(error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

exports.getSavingsTotals = async (req,res) => {
    const userId = req.user.id;

    try {
        const totalSavingsAgg = await Savings.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId)}},
            {$group: {_id: null, total: { $sum: '$amount' }}},
        ])

        const totalSavings = totalSavingsAgg[0]?.total || 0;

        //Total Savings one Month Ago
        const now = new Date();
        const oneMonthAgo = new Date();
        const sixMonthsAgo = new Date();

        oneMonthAgo.setMonth(now.getMonth()-1);
        sixMonthsAgo.setMonth(now.getMonth()-6);

        const oneMonthTotalSavingsAgg = await Savings.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId), date: { $gte: oneMonthAgo }}},
            {$group: {_id:null, total: { $sum: '$amount' }}}
        ])

        const oneMonthTotalSavings = oneMonthTotalSavingsAgg[0]?.total || 0;

        const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth()-11, 1);

        const savingAllMonthsTotals = await Savings.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId), date: {$gte: twelveMonthsAgo}}},
            {$group: {_id: { month: {$month: '$date'}, year: {$year: '$date'} }, total: { $sum: '$amount' }}},
            {$sort: {'_id.month':1, '_id.year':1 }},
            {$project: { _id:0, month: '$_id.month', year: '$_id.year', total:1 }}
        ])

        res.json({
            totalSavings,
            oneMonthTotalSavings,
            savingAllMonthsTotals,
        })

    } catch(error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}
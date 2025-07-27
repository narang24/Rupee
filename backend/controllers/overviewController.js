const mongoose = require("mongoose");
const Income = require("../models/Income");
const Expense = require("../models/Expense");
const Savings = require('../models/Savings')

exports.getTotals = async (req, res) => {
    const userId = req.user.id;

    try {
    //Total Income & Expense
        const totalIncomeAgg = await Income.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId)}},
            {$group: {_id: null, total: { $sum: '$amount' }}}
        ])

        const totalExpenseAgg = await Expense.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId)}},
            {$group: {_id: null, total: { $sum: '$amount' }}}
        ])

        const totalSavingAgg = await Savings.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId)}},
            {$group: {_id: null, total: { $sum: '$amount' }}}
        ])

        const totalIncome = totalIncomeAgg[0]?.total || 0;
        const totalExpense = totalExpenseAgg[0]?.total || 0;
        const totalSaving = totalSavingAgg[0]?.total || 0;

    //Total Income & Expense one month and six months ago

        const now = new Date();
        const oneMonthAgo = new Date();
        const sixMonthsAgo = new Date();

        oneMonthAgo.setMonth(now.getMonth()-1);
        sixMonthsAgo.setMonth(now.getMonth()-6);

        //Total Income & Expense (one month ago)
        const oneMonthTotalIncomeAgg = await Income.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId), date: { $gte: oneMonthAgo }}},
            {$group: {_id:null, total: { $sum: '$amount' }}}
        ])

        const oneMonthTotalExpenseAgg = await Expense.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId), date: { $gte: oneMonthAgo }}},
            {$group: {_id:null, total: { $sum: '$amount' }}}
        ])

        const oneMonthTotalSavingAgg = await Savings.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId), date: { $gte: oneMonthAgo }}},
            {$group: {_id:null, total: { $sum: '$amount' }}}
        ])

        const oneMonthTotalIncome = oneMonthTotalIncomeAgg[0]?.total || 0;
        const oneMonthTotalExpense = oneMonthTotalExpenseAgg[0]?.total || 0;
        const oneMonthTotalSaving = oneMonthTotalSavingAgg[0]?.total || 0;


        //Total Income & Expense (six months ago)
        const sixMonthsTotalIncomeAgg = await Income.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId), date: {$gte: sixMonthsAgo}}},
            {$group: {_id:null, total: {$sum: '$amount'}}}
        ])

        const sixMonthsTotalExpenseAgg = await Expense.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId), date: {$gte: sixMonthsAgo}}},
            {$group: {_id: null, total: {$sum: '$amount'}}}
        ])

        // const sixMonthsTotalSavingAgg = await Savings.aggregate([
        //     {$match: {userId: new mongoose.Types.ObjectId(userId), date: {$gte: sixMonthsAgo}}},
        //     {$group: {_id: null, total: {$sum: '$amount'}}}
        // ])

        const sixMonthsTotalIncome = sixMonthsTotalIncomeAgg[0]?.total || 0;
        const sixMonthsTotalExpense = sixMonthsTotalExpenseAgg[0]?.total || 0;
        // const sixMonthsTotalSaving = sixMonthsTotalSavingAgg[0]?.total || 0;


    // Category-wise totals
        const categoryIncomeAgg = await Income.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId)}},
            {$group: {_id: '$category', total: { $sum: '$amount' }}},
            {$project: {_id:0, category: '$_id', total:1}}
        ])
        
        const categoryExpenseAgg = await Expense.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId)}},
            {$group: {_id: '$category', total: { $sum: '$amount' }}},
            {$project: {_id:0, category: '$_id', total:1}}
        ])

        // const categorySavingAgg = await Savings.aggregate([
        //     {$match: {userId: new mongoose.Types.ObjectId(userId)}},
        //     {$group: {_id: '$category', total: { $sum: '$amount' }}},
        //     {$project: {_id:0, category: '$_id', total:1}}
        // ])

        const twelveMonthsAgo = new Date(now.getFullYear(),now.getMonth()-11,1);

    //Monthly Totals
        const expenseAllMonthsTotals = await Expense.aggregate([
            { $match: {userId: new mongoose.Types.ObjectId(userId), date: {$gte: twelveMonthsAgo}}},
            { $group: {_id: { year: {$year: '$date'}, month: {$month: '$date'}}, total: {$sum: '$amount' }}},
            { $sort: { '_id.year':1, '_id.month':1 }},
            { $project: {_id: 0, month: '$_id.month', year: '$_id.year', total: 1 }}
        ])

        const incomeAllMonthsTotals = await Income.aggregate([
            {$match: {userId: new mongoose.Types.ObjectId(userId), date: {$gte: twelveMonthsAgo}}},
            {$group: {_id: {year: {$year: '$date'}, month: {$month: '$date'}}, total: {$sum: '$amount'}}},
            {$sort: { '_id.year':1, '_id.month':1 }},
            {$project: { _id:0, month: '$_id.month', year: '$_id.year', total:1 }},
        ])

        // const savingAllMonthsTotals = await Savings.aggregate([
        //     {$match: {userId: new mongoose.Types.ObjectId(userId), date: {$gte: twelveMonthsAgo}}},
        //     {$group: {_id: {year: {$year: '$date'}, month: {$month: '$date'}}, total: {$sum: '$amount'}}},
        //     {$sort: { '_id.year':1, '_id.month':1 }},
        //     {$project: { _id:0, month: '$_id.month', year: '$_id.year', total:1 }},
        // ])

        res.json({ 
            totalIncome, 
            totalExpense,
            totalSaving, 
            categoryIncomeAgg, 
            categoryExpenseAgg,
            // categorySavingAgg,
            oneMonthTotalIncome,
            oneMonthTotalExpense,
            oneMonthTotalSaving,
            sixMonthsTotalIncome,
            sixMonthsTotalExpense,
            // sixMonthsTotalSaving,
            expenseAllMonthsTotals,
            incomeAllMonthsTotals,
            // savingAllMonthsTotals
        });

    } catch(error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}
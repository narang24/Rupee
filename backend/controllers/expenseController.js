const User = require('../models/User');
const Expense = require('../models/Expense');
const moment = require('moment');

exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    const { icon, category, name, amount, date, fileUrl } = req.body;

    if(!name || !amount || !date) {
        return res.status(400).json({message: 'All fields are required'})
    }

    try {
        const userExpense = await Expense.create({
            userId,
            icon,
            category,
            name,
            amount,
            date: new Date(date),
            fileUrl,
        })
        res.status(201).json({ message: 'Expense Added Successfully!' });
    } catch(error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.editExpense = async (req, res) => {
    const userId = req.user.id;

    const { icon, category, name, amount, date, fileUrl } = req.body;

    if(!name || !amount || !date)
        return res.status(400).json({message: "All fields are required"})

    try {
        const userExpense = await Expense.findOneAndUpdate(
            {_id:req.params.id, userId}, 
            { ...req.body, date: new Date(date) },
            {new: true}
        );
        if(!userExpense)
            return res.status(404).json({message:'Expense not found!'});
        res.status(200).json({message: 'Expense Updated Successfully!'});
    } catch(error) {
        res.status(500).json('Server Error');
    }
}

exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const userExpenses = await Expense.find({ userId }).sort({ date: -1 });
        const oldUserExpenses = await Expense.find({ userId }).sort({ date: 1 });

        const formatUserExpenses = userExpenses.map((item) => ({
            ...item._doc,
            date: moment(item.date).format('DD MMMM YYYY')
        }))

        const formatOldUserExpenses = oldUserExpenses.map((item) => ({
            ...item._doc,
            date: moment(item.date).format('DD MMMM YYYY')
        }))

        res.status(200).json({formatUserExpenses, formatOldUserExpenses});
    } catch(error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.getExpense = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const expense = await Expense.findOne({ userId, _id: id });
        if(expense)
            res.status(200).json({...expense._doc, date: moment(expense._doc.date).format("YYYY-MM-DD")});
        else
            res.status(404).json({message: 'Expense not found'})
    } catch(error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.deleteExpense = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const deleted = await Expense.findOneAndDelete({_id:id, userId});
        if(!deleted)
            return res.status(404).json({ message: 'Expense not found' });
        res.status(200).json({ message: 'Expense deleted Successfully!' });
    } catch(error) {
        res.status(500).json({ message: 'Server error' })
    }
}

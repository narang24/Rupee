const Income = require("../models/Income");
const moment = require('moment');

exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    const { category, icon, name, amount, date, fileUrl } = req.body;

    if(!name || !amount || !date)
        return res.status(400).json({ message: 'All fields are required' });

    try {
    const userIncome = await Income.create({
        userId,
        category,
        icon,
        name,
        amount,
        date: new Date(date),
        fileUrl
    });
    res.status(201).json({ message: 'Income Added Successfully!'});
    } catch(error) {
        res.status(500).json({ message: 'Server Error' });
    }
} 

exports.editIncome = async (req, res) => {
    const userId = req.user.id;

    const { category, icon, name, amount, date } = req.body;

    if(!name || !amount || !date)
        res.status(400).json({ message: 'All fields are required' });
    
    try {
        const userIncome = await Income.findOneAndUpdate(
            { _id: req.params.id, userId },
            {...req.body, date: new Date(date)},
            {new: true},
        );
        if(!userIncome)
            return res.status(404).json({ message: 'Income not found!' });
        res.status(200).json({ message: 'Income updated Successfully!' });

    } catch(error) {
        res.status(500).json({ message: 'Server Error' });
    }

}

exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const userIncomes = await Income.find({ userId }).sort({ date: -1 });
        const oldUserIncomes = await Income.find({ userId }).sort({ date:1 });

        const formatUserIncomes = userIncomes.map((item) => ({
            ...item._doc,
            date: moment(item.date).format(" DD MMMM YYYY ")
        }))

        const formatOldUserIncomes = oldUserIncomes.map((item) => ({
            ...item._doc,
            date: moment(item.date).format(" DD MMMM YYYY ")
        }))
        res.status(200).json({ formatUserIncomes, formatOldUserIncomes });
    } catch(error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getIncome = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const income = await Income.findOne({ userId, _id:id })
        if(income) {
            res.status(200).json({ ...income._doc, date: moment(income._doc.date).format("YYYY-MM-DD") })
        }
        else
            res.status(404).json({ message: 'Income not found '})
    } catch(error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.deleteIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const deleted = await Income.findOneAndDelete({ _id: req.params.id, userId });
        if(!deleted)
            res.status(404).json({ message: 'Income not found!' });
        res.status(200).json({ message: 'Income deleted Successfully!' });
    } catch(error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const User = require('../models/User');
const moment = require('moment');
const Savings = require('../models/Savings');

exports.addSaving = async (req, res) => {
    const userId = req.user.id;

    const { icon, category, name, amount, date, fileUrl } = req.body;

    if(!name || !amount || !date) {
        return res.status(400).json({message: 'All fields are required'})
    }

    try {
        const userSaving = await Savings.create({
            userId,
            icon,
            category,
            name,
            amount,
            date: new Date(date),
            fileUrl,
        })
        res.status(201).json({ message: 'Saving Added Successfully!' });
    } catch(error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.editSaving = async (req, res) => {
    const userId = req.user.id;

    const { icon, category, name, amount, date, fileUrl } = req.body;

    if(!name || !amount || !date)
        return res.status(400).json({message: "All fields are required"})

    try {
        const userSaving = await Savings.findOneAndUpdate(
            {_id:req.params.id, userId}, 
            { ...req.body, date: new Date(date) },
            {new: true}
        );
        if(!userSaving)
            return res.status(404).json({message:'Saving not found!'});
        res.status(200).json({message: 'Saving Updated Successfully!'});
    } catch(error) {
        res.status(500).json('Server Error');
    }
}

exports.getAllSavings = async (req, res) => {
    const userId = req.user.id;

    try {
        const userSavings = await Savings.find({ userId }).sort({ date: -1 });
        const oldUserSavings = await Savings.find({ userId }).sort({ date: 1 });

        const formatUserSavings = userSavings.map((item) => ({
            ...item._doc,
            date: moment(item.date).format('DD MMMM YYYY')
        }))

        const formatOldUserSavings = oldUserSavings.map((item) => ({
            ...item._doc,
            date: moment(item.date).format('DD MMMM YYYY')
        }))

        res.status(200).json({formatUserSavings, formatOldUserSavings});
    } catch(error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.getSaving = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const saving = await Savings.findOne({ userId, _id: id });
        if(saving)
            res.status(200).json({...saving._doc, date: moment(saving._doc.date).format("YYYY-MM-DD")});
        else
            res.status(404).json({message: 'Saving not found'})
    } catch(error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.deleteSaving = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const deleted = await Savings.findOneAndDelete({_id:id, userId});
        if(!deleted)
            return res.status(404).json({ message: 'Saving not found' });
        res.status(200).json({ message: 'Saving deleted Successfully!' });
    } catch(error) {
        res.status(500).json({ message: 'Server error' })
    }
}

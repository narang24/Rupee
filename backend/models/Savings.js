const mongoose = require('mongoose');

const SavingsSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        category:{ type: String, default: 'Miscellaneous' },
        icon: { type: String },
        name: { type: String, required: true },
        amount: { type: Number, required: true, min: 0 },
        date: { type: Date, required: true, default: Date.now },
        fileUrl: { type: String }
    }
)

const GoalsSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        icon: { type: String },
        name: { type: String, required: true },
        total: { type: Number, required: true, min: 0 },
        input: { type: Number, required: true, min: 0 },
    }
)

const Savings = mongoose.model('Savings',SavingsSchema);
const Goals = mongoose.model('Goals',GoalsSchema);

module.exports = { Savings, Goals };
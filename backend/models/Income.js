const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        category: { type: String, default: 'Miscellaneous' },
        icon: { type: String },
        name: { type: String, required: true },
        amount: { type: Number, required: true, min: 0 },
        date: { type: Date, required: true, default: Date.now },
        fileUrl: { type:String }
    },
)

module.exports = mongoose.model('Income',IncomeSchema);
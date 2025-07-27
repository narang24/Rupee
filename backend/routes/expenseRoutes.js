const express = require('express');
const { addExpense, editExpense, getAllExpense, deleteExpense, getExpense } = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', protect, addExpense);
router.put('/edit/:id', protect, editExpense);
router.get('/get-all', protect, getAllExpense);
router.get('/get/:id', protect, getExpense);
router.delete('/delete/:id', protect, deleteExpense);

module.exports = router;
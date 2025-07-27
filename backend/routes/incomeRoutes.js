const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addIncome, editIncome, getAllIncome, deleteIncome, getIncome } = require('../controllers/incomeControllers');

const router = express.Router();

router.post('/add', protect, addIncome);
router.put('/edit/:id', protect, editIncome);
router.get('/get-all', protect, getAllIncome);
router.get('/get/:id', protect, getIncome);
router.delete('/delete/:id', protect, deleteIncome);

module.exports = router;
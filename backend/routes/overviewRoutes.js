const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getSavingsTotals, getIncomeTotals, getExpenseTotals } = require('../controllers/overviewController');

const router = express.Router();

router.get('/expenseTotals', protect, getExpenseTotals);
router.get('/incomeTotals', protect, getIncomeTotals)
router.get('/savingsTotals', protect, getSavingsTotals);

module.exports = router;
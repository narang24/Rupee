const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getTotals } = require('../controllers/overviewController');

const router = express.Router();

router.get('/totals', protect, getTotals)

module.exports = router;
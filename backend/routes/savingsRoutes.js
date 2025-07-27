const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addSaving, editSaving, getAllSavings, getSaving, deleteSaving } = require('../controllers/savingController');

const router = express.Router();

router.post('/add', protect, addSaving);
router.put('/edit/:id', protect, editSaving);
router.get('/get-all', protect, getAllSavings);
router.get('/get/:id', protect, getSaving);
router.delete('/delete/:id', protect, deleteSaving);

module.exports = router;
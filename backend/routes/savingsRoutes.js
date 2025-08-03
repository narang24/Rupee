const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addSaving, editSaving, getAllSavings, getSaving, deleteSaving, addGoal, editGoal, getAllGoals, getGoal, deleteGoal } = require('../controllers/savingController');

const router = express.Router();

router.post('/add', protect, addSaving);
router.put('/edit/:id', protect, editSaving);
router.get('/get-all', protect, getAllSavings);
router.get('/get/:id', protect, getSaving);
router.delete('/delete/:id', protect, deleteSaving);

router.post('/goals/add', protect, addGoal);
router.put('/goals/edit/:id', protect, editGoal);
router.get('/goals/get-all', protect, getAllGoals);
router.get('/goals/get/:id', protect, getGoal);
router.delete('/goals/delete/:id', protect, deleteGoal);

module.exports = router;
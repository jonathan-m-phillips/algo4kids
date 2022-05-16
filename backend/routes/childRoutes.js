const express = require('express')
const router = express.Router()
const { 
    createChild,
} = require('../controllers/childController')
const { protect } = require('../middleware/authMiddleware.js')

// router.route('/').get(protect, getGoals).post(protect, setGoal)
// router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)


router.route('/create').post(protect, createChild)

module.exports = router
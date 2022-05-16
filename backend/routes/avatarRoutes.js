const express = require('express')
const router = express.Router()
const { 
    createAvatar,
} = require('../controllers/avatarController')
const { protect } = require('../middleware/authMiddleware.js')

// router.route('/').get(protect, getGoals).post(protect, setGoal)
// router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)


router.route('/create').post(protect, createAvatar)

module.exports = router
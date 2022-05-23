const express = require('express')
const router = express.Router()
const { 
    getAvatars,
    createAvatar,
    updateAvatar,
} = require('../controllers/avatarController')
const { protect } = require('../middleware/authMiddleware.js')

router.route('/').get(protect, getAvatars).post(protect, createAvatar)
router.route('/:id').put(protect, updateAvatar)

module.exports = router
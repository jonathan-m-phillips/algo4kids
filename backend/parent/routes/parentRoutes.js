const express = require('express')
const router = express.Router()
const { 
    registerParent,
    loginParent,
    getMe,
} = require('../controllers/parentController')
const { protect } = require('../../_middleware/authMiddleware.js')

router.post('/', registerParent)
router.post('/login', loginParent)
router.get('/me', protect, getMe)

module.exports = router
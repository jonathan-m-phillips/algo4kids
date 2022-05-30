const express = require('express')
const router = express.Router()
const { 
    registerAdmin,
    loginAdmin,
    getMe,
} = require('../controllers/adminController')
const { protect } = require('../../_middleware/authMiddleware.js')

router.post('/register-admin', registerAdmin)
router.post('/login-admin', loginAdmin)
router.get('/me-admin', protect, getMe)

module.exports = router
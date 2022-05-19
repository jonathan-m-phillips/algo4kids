const express = require('express')
const router = express.Router()
const { 
    getChildren,
    addChild,
    updateChild,
    deleteChild
} = require('../controllers/childController')
const { protect } = require('../middleware/authMiddleware.js')

router.route('/').get(protect, getChildren).post(protect, addChild)
router.route('/:id').delete(protect, deleteChild).put(protect, updateChild)

module.exports = router
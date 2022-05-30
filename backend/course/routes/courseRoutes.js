const express = require('express')
const router = express.Router()
const { 
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courseController')
const { protect } = require('../../_middleware/authMiddleware.js')

router.route('/').get(protect, getCourses).post(protect, createCourse)
router.route('/:id').delete(protect, deleteCourse).put(protect, updateCourse)

module.exports = router
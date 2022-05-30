const asyncHandler = require('express-async-handler')

const Course = require('../models/courseModel')
const Admin = require('../../admin/models/adminModel')


// @desc    Get courses
// @route   GET /api/courses
// @access  Private
const getCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find( { admin: req.admin.id })

    res.status(200).json(courses)
})


// @desc    Create course
// @route   POST /api/courses
// @access  Private
const createCourse = asyncHandler(async (req, res) => {
    const { username, ageGroup, gender } = req.body

    if (!username || !ageGroup || !gender) {
        res.status(400)
        throw new Error('Please fill out all fields')
    }

    const course = await Course.create({
        admin: req.admin.id,
        username: req.body.username,
        ageGroup: req.body.ageGroup,
        gender: req.body.gender
    })

    res.status(200).json(course)
})


// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private
const updateCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id)

    // Check for course
    if (!course) {
        res.status(400)
        throw new Error('Course not found')
    }

    // Check for admin
    if (!req.admin) {
        res.status(401)
        throw new Error('Admin not found')
    }

    // Make sure the logged in admin matches the course's admin
    if (course.admin.toString() !== req.admin.id) {
        res.status(401)
        throw new Error('Admin not authorized')
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedCourse)
})


// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private
const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id)

    // Check for course
    if (!course) {
        res.status(400)
        throw new Error('Course not found')
    }

    // Check for admin
    if (!req.admin) {
        res.status(401)
        throw new Error('Admin not found')
    }

    // Make sure the logged in admin matches the course's admin
    if (course.admin.toString() !== req.admin.id) {
        res.status(401)
        throw new Error('Admin not authorized')
    }

    await course.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse
}
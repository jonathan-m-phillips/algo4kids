const asyncHandler = require('express-async-handler')

const Child = require('../models/childModel')
const Parent = require('../models/parentModel')

// @desc    Get children
// @route   GET /api/child
// @access  Private
const getChildren = asyncHandler(async (req, res) => {
    const children = await Child.find( { user: req.parent.id })

    res.status(200).json(children)
})


// @desc    Add child
// @route   POST /api/child
// @access  Private
const addChild = asyncHandler(async (req, res) => {
    const { username, ageGroup, gender } = req.body

    if (!username || !ageGroup || !gender) {
        res.status(400)
        throw new Error('Please fill out all fields')
    }

    const child = await Child.create({
        parent: req.parent.id,
        username: req.body.username,
        ageGroup: req.body.ageGroup,
        gender: req.body.gender
    })

    res.status(200).json(child)
})


// @desc    Update child
// @route   PUT /api/child/:id
// @access  Private
const updateChild = asyncHandler(async (req, res) => {
    const child = await Child.findById(req.params.id)

    // Check for child
    if (!child) {
        res.status(400)
        throw new Error('Child not found')
    }

    // Check for user
    if (!req.parent) {
        res.status(401)
        throw new Error('Parent not found')
    }

    // Make sure the logged in parent matches the child's parent
    if (child.parent.toString() !== req.parent.id) {
        res.status(401)
        throw new Error('Parent not authorized')
    }

    const updatedChild = await Child.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedChild)
})


// @desc    Delete child
// @route   DELETE /api/child/:id
// @access  Private
const deleteChild = asyncHandler(async (req, res) => {
    const child = await Child.findById(req.params.id)

    // Check for child
    if (!child) {
        res.status(400)
        throw new Error('Child not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in parent matches the child's parent
    if (child.parent.toString() !== req.parent.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await child.remove()
    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getChildren,
    addChild,
    updateChild,
    deleteChild
}
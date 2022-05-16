const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const Child = require('../models/childModel')


// @desc    Create child
// @route   POST /api/child/create
// @access  Private
const createChild = asyncHandler(async (req, res) => {
    const { username, ageGroup, gender } = req.body
    
    if (!username || !ageGroup || !gender) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const child = await Child.create({
        parent: req.parent.id,
        username: req.body.username,
        ageGroup: req.body.ageGroup,
        gender: req.body.gender,
    })

    if (child) {
        res.status(201).json({
            _id: child._id,
            token: generateToken(child._id),
            username: child.username,
            ageGroup: child.ageGroup,
            gender: child.gender,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

    res.status(200).json(child)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    createChild,
}
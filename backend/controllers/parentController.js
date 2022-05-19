const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Parent = require('../models/parentModel')


// @desc    Register new parent
// @route   POST /api/parent
// @access  Public
const registerParent = asyncHandler(async (req, res) => {
    const { email, password, firstName,
        lastName, age, Address } = req.body

    if (!email || !password || !firstName || !lastName ||
        !age || !Address) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if parent exists
    const parentExists = await Parent.findOne({ email })

    if (parentExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create parent
    const parent = await Parent.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        age,
        Address,
    })

    if (parent) {
        res.status(201).json({
            _id: parent._id,
            email: parent.email,
            token: generateToken(parent._id),
            firstName: parent.firstName,
            lastName: parent.lastName,
            age: parent.age,
            Address: parent.Address,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// @desc    Authenticate a parent
// @route   POST /api/parent/login
// @access  Public
const loginParent = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //Check for parent email
    const parent = await Parent.findOne({ email })

    // Check parent password
    if (parent && (await bcrypt.compare(password, parent.password))) {
        res.json({
            _id: parent._id,
            email: parent.email,
            token: generateToken(parent._id),
            firstName: parent.firstName,
            lastName: parent.lastName,
            age: parent.age,
            Address: parent.Address,
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


// @desc    Get parent data
// @route   GET /api/parent/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.parent)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerParent,
    loginParent,
    getMe,
}
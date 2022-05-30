const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')


// @desc    Register new admin
// @route   POST /api/register-admin
// @access  Public
const registerAdmin = asyncHandler(async (req, res) => {
    const { email, password, firstName,
        lastName, age, Address } = req.body

    if (!email || !password || !firstName || !lastName ||
        !age || !Address) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if admin exists
    const adminExists = await Admin.findOne({ email })

    if (adminExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create admin
    const admin = await Admin.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
    })

    if (admin) {
        res.status(201).json({
            _id: admin._id,
            email: admin.email,
            token: generateToken(admin._id),
            firstName: admin.firstName,
            lastName: admin.lastName,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// @desc    Authenticate a admin
// @route   POST /api/admin/login-admin
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //Check for admin email
    const admin = await Admin.findOne({ email })

    // Check admin password
    if (admin && (await bcrypt.compare(password, admin.password))) {
        res.json({
            _id: admin._id,
            email: admin.email,
            token: generateToken(admin._id),
            firstName: admin.firstName,
            lastName: admin.lastName,
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


// @desc    Get admin data
// @route   GET /api/admin/me-admin
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.admin)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerAdmin,
    loginAdmin,
    getMe,
}
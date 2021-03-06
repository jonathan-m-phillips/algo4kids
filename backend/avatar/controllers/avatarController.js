const asyncHandler = require('express-async-handler')
const Avatar = require('../models/avatarModel')

// @desc    Get avatars
// @route   GET /api/avatar
// @access  Private
const getAvatars = asyncHandler(async (req, res) => {
    const avatars = await Avatar.find({ parent: req.parent.id })

    res.status(200).json(avatars)
})

// @desc    Create avatar
// @route   POST /api/avatar/create
// @access  Private
const createAvatar = asyncHandler(async (req, res) => {
    const { child, bodyType, clothing, face, mouth, nose,
        eyes, skinColor, accessories,
        hairColor, hairStyle } = req.body

    const avatar = await Avatar.create({
        parent: req.parent.id,
        child: req.body.child,
        bodyType: req.body.bodyType,
        clothing: req.body.clothing,
        face: req.body.face,
        mouth: req.body.mouth,
        nose: req.body.nose,
        eyes: req.body.eyes,
        skinColor: req.body.skinColor,
        accessories: req.body.accessories,
        hairColor: req.body.hairColor,
        hairStyle: req.body.hairStyle,
    })

    res.status(200).json(avatar)
})


// @desc    Update avatar
// @route   PUT /api/avatar/:id
// @access  Private
const updateAvatar = asyncHandler(async (req, res) => {
    const avatar = await Avatar.findById(req.params.id)

    // Check for avatar
    if (!avatar) {
        res.status(400)
        throw new Error('Avatar not found')
    }

    // Check for parent
    if (!req.parent) {
        res.status(401)
        throw new Error('Child not found')
    }

    // Make sure the logged in parent matches the child's parent
    // if (avatar.child.toString() !== req.child.id) {
    //     res.status(401)
    //     throw new Error('Parent not authorized')
    // }

    const updatedAvatar = await Avatar.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedAvatar)
})

module.exports = {
    getAvatars,
    createAvatar,
    updateAvatar,
}
const asyncHandler = require('express-async-handler')
const Avatar = require('../models/avatarModel')

// @desc    Create avatar
// @route   POST /api/avatar/create
// @access  Private
const createAvatar = asyncHandler(async (req, res) => {
    const { bodyType, clothing, face, mouth, nose,
        eyes, skinColor, accessories, 
        hairColor, hairStyle } = req.body

    // if (!username || !ageGroup || !gender) {
    //     res.status(400)
    //     throw new Error('Please add all fields')
    // }

    const avatar = await Avatar.create({
        child: req.child.id,
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

module.exports = {
    createAvatar,
}
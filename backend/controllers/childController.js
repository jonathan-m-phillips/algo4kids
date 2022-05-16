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

    res.status(200).json(child)
})

module.exports = {
    createChild,
}
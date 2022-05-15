const mongoose = require("mongoose");

const AvatarSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Child'
    },
    bodyType: {
        type: Number,
        enum: [1, 2, 3, 4, 5,]
    },
    clothing: {
        type: Number,
        enum: [1, 2, 3, 4, 5,]
    },
    face: {
        type: Number,
        enum: [1, 2, 3, 4, 5,]
    },
    mouth: {
        type: Number,
        enum: [1, 2, 3, 4, 5,]
    },
    nose: {
        type: Number,
        enum: [1, 2, 3, 4, 5,]
    },
    eyes: {
        type: Number,
        enum: [1, 2, 3, 4, 5,]
    },
    skinColor: {
        type: Number,
        enum: [1, 2, 3, 4, 5,]
    },
    accessories: {
        type: Number,
        enum: [1, 2, 3, 4, 5,]
    },
    hairColor: {
        type: Number,
        enum: [1, 2, 3, 4, 5,]
    },
    hairStyle: {
        type: Number,
        enum: [1, 2, 3, 4, 5,]
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Avatar", AvatarSchema);
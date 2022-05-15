const mongoose = require("mongoose");

const ChildSchema = new mongoose.Schema({
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Parent'
    },
    username: {
        type: String,
        min: 5,
        max: 16
    },
    ageGroup: {
        type: Number,
        enum: [1, 2, 3]
    },
    gender: {
        type: Number,
        enum: [1, 2]
    },
    coursesTaken: {
        type: Array,
    },
    quizzesTaken: {
        type: Array,
    },
    favoriteCourses: {
        type: Array,
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("Child", ChildSchema);
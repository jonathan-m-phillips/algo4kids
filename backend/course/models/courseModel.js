const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin'
    },
    courseName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: false
    },
    miniQuiz: {
        type: Object,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
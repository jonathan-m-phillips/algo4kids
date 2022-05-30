const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 30
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 40
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);
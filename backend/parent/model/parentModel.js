const mongoose = require("mongoose");

const ParentSchema = new mongoose.Schema({
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
    age: {
        type: Number,
        required: true,
        min: 18,
    },
    Address: {
        type: Object,
        required: true,
        street: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        zipcode: {
            type: String,
            required: true,
        }
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Parent", ParentSchema);
const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        province: String,
        postalCode: String
    },
    schoolContact: {
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    schoolType: {
        type: String,
        required: true
    },
})

const School = mongoose.model('school', SchoolSchema);

module.exports = School;
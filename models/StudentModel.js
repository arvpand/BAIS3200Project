const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    studentName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    grade: {
        type: Number,
        required: true
    },
    allergies: {
        type: String
    },
    medicalConditions: [String],
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'parent'
    },

})

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;
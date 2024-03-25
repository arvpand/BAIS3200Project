const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    teacherName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true
    },
    subjectsTaught: [String],
    phoneExtension: {
        type: Number
    },
})

const Teacher = mongoose.model('teacher', TeacherSchema);

module.exports = Teacher;
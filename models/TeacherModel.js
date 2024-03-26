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
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'school'
    }
})

const Teacher = mongoose.model('teacher', TeacherSchema);

module.exports = Teacher;
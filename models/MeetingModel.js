const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    attendees: [String],
    description: {
        type: String
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'school'
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'teacher'
    },
    parent: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'parent'
    }],
    meetingDateTime: {
        date: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    agenda: {
        type: String
    },
    meetingType: String,
    duration: Number,
    notes: String,

}, timestamp = true)

const Meeting = mongoose.model('meeting', MeetingSchema);

module.exports = Meeting;
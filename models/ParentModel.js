const mongoose = require('mongoose');

const ParentSchema = new mongoose.Schema({
    parentName: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    contactInfo: {
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    alternateContact: {
        email: String,
        phone: String
    },
    relationshipToStudent: String,
})

const Parent = mongoose.model('parent', ParentSchema);

module.exports = Parent;
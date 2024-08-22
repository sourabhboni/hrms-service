const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        unique: true, // This enforces uniqueness in MongoDB
        required: true, // Ensure that employeeId is not null
    },
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['employee', 'manager', 'admin'],
        default: 'employee',
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
});

module.exports = mongoose.model('Employee', employeeSchema);

// # Registration schema for event

const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId, // Reference to User
    name: String,
    email: String,
    phone: String,
    college: String,
    registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', registrationSchema);

//  # Registration routes
const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration'); // Import the Registration model

// Event Registration Route
router.post('/', async (req, res) => {
    try {
        if (!req.user) {
            console.error("User is not authenticated. Redirecting to login.");
            return res.redirect('/'); // Redirect if not authenticated
        }

        const { name, email, phone, college } = req.body;

        // Check if the user is already registered
        const existingRegistration = await Registration.findOne({ email });
        if (existingRegistration) {
            return res.render('dashboard', { user: req.user, message: "You are already registered!" });
        }

        // Create new registration
        const newRegistration = new Registration({
            userId: req.user._id,
            name,
            email,
            phone,
            college
        });

        await newRegistration.save();
        res.redirect('/dashboard'); // Redirect to dashboard after successful registration
    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.redirect('/error'); // Redirect to error page
    }
});

module.exports = router;

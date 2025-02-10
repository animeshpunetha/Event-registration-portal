// # Authentication routes
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Initiate Google Authentication

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"  // Forces Google to ask for login every time
}));


// Google callback URL after authentication
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        // Successful authentication, redirect to the registration page.
        res.redirect("/register");
    }
);

// Logout route
router.get("/logout", (req, res) => {
    req.logout((err) => {  // Use callback to handle errors properly
        if (err) {
            console.error("Logout Error:", err);
            return res.redirect("/error");
        }
        req.session.destroy(() => {
            res.clearCookie("connect.sid"); // Clear session cookie
            res.redirect("/");  // Redirect to login page after logout
        });
    });
});

module.exports = router;
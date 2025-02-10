require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo'); // ✅ Added MongoDB session store

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Import Passport config BEFORE initializing passport
require('./config/passport');

// Middleware to serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Set up EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// ✅ Session configuration with MongoDB store
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'supersecret',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: MONGO_URI,
            collectionName: 'sessions', // Optional: Change collection name
            ttl: 60 * 60 // 1 hour expiry
        }),
        cookie: { secure: false, maxAge: 3600000 } // 1 hour
    })
);

// ✅ Initialize Passport AFTER setting up session
app.use(passport.initialize());
app.use(passport.session());

// Import and use the auth routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const registerRoutes = require('./routes/register');
app.use('/register', registerRoutes);

// Routes
app.get('/', (req, res) => {
    res.render('login'); // Render login.ejs
});

app.get('/register', (req, res) => {
    if (!req.user) return res.redirect('/');
    res.render('register', { user: req.user });
});

app.get('/dashboard', (req, res) => {
    if (!req.user) return res.redirect('/');
    res.render('dashboard', { user: req.user });
});

app.get('/error', (req, res) => {
    res.render('error');
});

// Debugging routes
app.get("/session-check", (req, res) => {
    console.log("📌 Session Data:", req.session);
    console.log("📌 req.user:", req.user);
    res.json({ session: req.session, user: req.user });
});

app.get("/debug-session", (req, res) => {
    console.log("📌 Session Data:", req.session);
    console.log("📌 User from Passport:", req.user);
    res.json({ session: req.session, user: req.user });
});

// Function to connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected Successfully!");
        
        // Start the server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
}

// Connect to the DB and then start the server
connectDB();

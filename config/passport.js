// Google OAuth configuration
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL || "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("🔹 Google OAuth Response:", profile);  // Debugging

        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          console.log("🟢 New user detected. Saving to DB...");
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value
          });
          console.log("✅ User saved successfully:", user);
        } else {
          console.log("⚡ User already exists:", user);
        }

        return done(null, user);
      } catch (error) {
        console.error("❌ Error saving user:", error);
        return done(error, null);
      }
    }
  )
);


// Serialize user to store data in session
passport.serializeUser((user, done) => {
  console.log("Serializing user:", user._id);
  done(null, user._id);
});

// Deserialize user to retrieve data from session
passport.deserializeUser(async (id, done) => {
  try {
    console.log("🔍 Deserializing user with ID:", id);  // Debugging

    const user = await User.findById(id);
    if (!user) {
      console.log("❌ User not found in DB during deserialization");
      return done(null, false);
    }

    console.log("✅ User deserialized:", user);
    return done(null, user);
  } catch (error) {
    console.error("❌ Error in deserialization:", error);
    done(error, null);
  }
});


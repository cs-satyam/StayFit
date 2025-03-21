const express = require("express");
const session = require("express-session");
const User = require("../models/userModel");

const router = express.Router();

// 📝 Configure Express-Session Middleware
router.use(
    session({
        secret: "yourSecretKey", // Change this to a strong secret key
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 3600000 }, // 1-hour session
    })
);

// 📝 Register User
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, age, gender, height, weight, goal } = req.body;

        if (await User.findOne({ email })) {
            console.log("❌ User already exists");
            return res.status(400).render("register", { message: "User already exists" });
        }

        const newUser = new User({ name, email, password, age, gender, height, weight, goal });
        await newUser.save();

        console.log("✅ User registered successfully:", email);
        res.redirect("/login"); // Redirect to login page
    } catch (error) {
        console.log("🔥 Registration Error:", error);
        res.status(500).render("register", { message: "Server error, try again later" });
    }
});

// 📝 Login User (Session-based)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            console.log("❌ User not found");
            return res.status(400).render("login", { message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log("❌ Incorrect password");
            return res.status(400).render("login", { message: "Invalid credentials" });
        }

        // ✅ Successful Login
        req.session.userId = user._id;
        req.session.userEmail = user.email;
        req.session.userName = user.name;

        console.log(`✅ Login successful: ${user.email}`);
        res.render("stayfit", { user }); // Render stayfit.ejs with user details
    } catch (error) {
        console.log("🔥 Login Error:", error);
        res.status(500).render("login", { message: "Server error, try again later" });
    }
});

// 📝 Logout User
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("❌ Logout failed:", err);
            return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie("connect.sid");
        console.log("✅ Logout successful");
        res.redirect("/login");
    });
});

module.exports = router;

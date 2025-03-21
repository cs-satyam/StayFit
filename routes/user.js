const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); // Generates random tokens
const nodemailer = require("nodemailer"); // Sends emails

const router = express.Router();

// Mock Email Transport (Replace with real SMTP settings)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
    },
});

// ✅ Step 1: Show "Forgot Password" Page
router.get("/forgot-password", (req, res) => {
    res.render("forgotPassword", { message: "" });
});

// ✅ Step 2: Handle Forgot Password Request
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.render("forgotPassword", { message: "User not found!" });
    }

    // Generate Reset Token (valid for 1 hour)
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 3600000; // 1 hour expiration
    await user.save();

    // Send Reset Link via Email
    const resetLink = `http://localhost:4000/reset-password/${resetToken}`;
    await transporter.sendMail({
        to: user.email,
        subject: "Password Reset Request",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    console.log(`📧 Reset link sent to ${user.email}: ${resetLink}`);
    res.render("forgotPassword", { message: "Check your email for reset link!" });
});

// ✅ Step 3: Show Update Password Page
router.get("/reset-password/:token", async (req, res) => {
    const { token } = req.params;

    // Find user with matching reset token
    const user = await User.findOne({ resetToken: token, resetTokenExpire: { $gt: Date.now() } });

    if (!user) {
        return res.render("forgotPassword", { message: "Invalid or expired reset link!" });
    }

    res.render("updatePassword", { message: "", token });
});

// ✅ Step 4: Handle Password Reset
router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Find user with valid token
    const user = await User.findOne({ resetToken: token, resetTokenExpire: { $gt: Date.now() } });

    if (!user) {
        return res.render("forgotPassword", { message: "Invalid or expired reset link!" });
    }

    // Update password
    user.password = await bcrypt.hash(newPassword, 12);
    user.resetToken = undefined; // Clear token after reset
    user.resetTokenExpire = undefined;
    await user.save();

    console.log(`✅ Password successfully reset for ${user.email}`);

    res.redirect("/login?message=Password reset successful! Please login.");
});

module.exports = router;

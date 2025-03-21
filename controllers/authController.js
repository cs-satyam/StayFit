const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ✅ Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password, age, gender } = req.body;

        // Check if user already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10); // bcrypt.hash takes the password and the salt rounds

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password: hashedPassword,  // Use the hashed password
            age,
            gender,
        });

        // Save the user to the database
        await newUser.save();

        // Send a successful response
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


// ✅ Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the provided password with the hashed password stored in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token if login is successful
        const token = jwt.sign({ userId: user._id }, "secretKey", { expiresIn: "1h" });

        // Send the token in the response
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

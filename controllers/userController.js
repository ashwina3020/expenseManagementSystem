const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs'); // Import bcrypt for hashing passwords
const jwt = require('jsonwebtoken'); // Import JWT for token generation

// Login callback
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                // Don't send sensitive information like password
            },
            token,
        });
    } catch (error) {
        console.error("Error in login callback:", error); // Log error
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

// Register callback
const registerController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // Hash with salt rounds

        const newUser = new userModel({
            ...req.body,
            password: hashedPassword, // Save hashed password
        });
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                id: newUser._id,
                email: newUser.email,
                // Don't send sensitive information like password
            },
        });
    } catch (error) {
        console.error("Error in register callback:", error); // Log error
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

module.exports = { loginController, registerController };

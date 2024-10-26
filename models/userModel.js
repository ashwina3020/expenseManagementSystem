const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User Schema definition
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'], // Simple email format validation
    },
    password: {
        type: String,
        required: [true, 'Password is required'], // Marked as required
    },
}, { timestamps: true });

// Pre-save hook to hash passwords
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Skip hashing if password is not modified
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next(); // Proceed to save
});

// Method to compare password for authentication
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password); // Compare passwords
};

const userModel = mongoose.model('User', userSchema); // Model name is typically singular

module.exports = userModel;

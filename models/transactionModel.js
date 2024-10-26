const mongoose = require('mongoose');

// Define valid transaction types and categories
const transactionTypes = ['income', 'expense', 'miscellaneous'];
const transactionCategories = [
    'salary',
    'side-hustle',
    'assets',
    'food',
    'movie',
    'bills',
    'medical',
    'fees',
    'tax',
];

const transactionSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId for referencing the user
        required: true,
        ref: 'User', // Reference to the User model
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
    },
    type: {
        type: String,
        enum: transactionTypes, // Restrict to predefined types
        required: [true, 'Transaction type is required'],
    },
    category: {
        type: String,
        enum: transactionCategories, // Restrict to predefined categories
        required: [true, 'Category is required'],
    },
    reference: {
        type: String,
        default: '', // Optional field with a default value
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
        default: Date.now, // Default to the current date if not provided
    },
}, { timestamps: true });

// Add an index to improve query performance
transactionSchema.index({ userid: 1, date: -1 }); // Index by userid and date

const transactionModel = mongoose.model('Transaction', transactionSchema);

module.exports = transactionModel;

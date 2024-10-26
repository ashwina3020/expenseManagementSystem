const transactionModel = require('../models/transactionModel');
const moment = require('moment');

// Get all transactions
const getAllTransactions = async (req, res) => {
    try {
        const { frequency, selectedDate, type, userid } = req.body; // Ensure userid is received in the request body
        const query = {
            userid,
            ...(frequency !== 'custom' ? {
                date: {
                    $gt: moment().subtract(Number(frequency), 'd').toDate(),
                },
            } : {
                date: {
                    $gte: selectedDate[0],
                    $lte: selectedDate[1],
                },
            }),
            ...(type !== 'all' && { type }),
        };
        
        const transactions = await transactionModel.find(query);
        res.status(200).json(transactions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching transactions" });
    }
};

// Add a new transaction
const addTransaction = async (req, res) => {
    try {
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();
        res.status(201).json({
            success: true,
            message: "Transaction created successfully",
            newTransaction,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding transaction" });
    }
};

// Edit an existing transaction
const editTransaction = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the URL parameters
        const updatedTransaction = await transactionModel.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedTransaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }
        
        res.status(200).json({
            success: true,
            message: "Transaction updated successfully",
            updatedTransaction,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error editing transaction" });
    }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the URL parameters
        const deletedTransaction = await transactionModel.findByIdAndDelete(id);
        
        if (!deletedTransaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }
        
        res.status(200).json({
            success: true,
            message: "Transaction deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error deleting transaction" });
    }
};

module.exports = { getAllTransactions, addTransaction, editTransaction, deleteTransaction };

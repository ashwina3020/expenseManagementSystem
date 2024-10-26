const express = require("express");
const {
    addTransaction,
    getAllTransactions,
    editTransaction,
    deleteTransaction,
} = require("../controllers/transactionControllers");

const router = express.Router();

// Routes
// Add a new transaction
router.post('/transactions', addTransaction);

// Edit an existing transaction
router.put('/transactions/:id', editTransaction); // Use PUT for updates

// Get all transactions
router.get('/transactions', getAllTransactions); // Use GET to fetch transactions

// Delete a transaction
router.delete('/transactions/:id', deleteTransaction); // Use DELETE for deletion

module.exports = router;

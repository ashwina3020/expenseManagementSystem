const express = require("express");
const {
    addTransaction,
    getAllTransactions,
    editTransaction,
    deleteTransaction,
} = require("../controllers/transactionControllers");

const router = express.Router();

// Routes
router.post('/transactions', addTransaction); // Create a transaction
router.get('/transactions', getAllTransactions); // Retrieve transactions
router.put('/transactions/:id', editTransaction); // Edit a transaction
router.delete('/transactions/:id', deleteTransaction); // Delete a transaction

module.exports = router;

import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// ✅ Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add new transaction
router.post("/", async (req, res) => {
  try {
    const { description, date, income, expense } = req.body;
    const newTransaction = new Transaction({ description, date, income, expense });
    await newTransaction.save();
    res.json(newTransaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update transaction by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete transaction by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

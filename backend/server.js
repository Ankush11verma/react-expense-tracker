import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

// ----------------------------
// App Config
// ----------------------------
const app = express();
const PORT = 5000;

// ----------------------------
// Middleware
// ----------------------------
app.use(cors());
app.use(bodyParser.json());

// ----------------------------
// MongoDB Connection
// ----------------------------
mongoose
  .connect("mongodb://127.0.0.1:27017/expense-tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ----------------------------
// Transaction Schema & Model
// ----------------------------
const transactionSchema = new mongoose.Schema({
  income: { type: Number, default: 0 },
  expense: { type: Number, default: 0 },
  description: { type: String, required: true },
  date: { type: String, required: true },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// ----------------------------
// Routes
// ----------------------------

// 👉 Get all transactions
app.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 Add new transaction
app.post("/transactions", async (req, res) => {
  try {
    const { income, expense, description, date } = req.body;
    const newTransaction = new Transaction({ income, expense, description, date });
    await newTransaction.save();
    res.json(newTransaction);
  } catch (err) {
    res.status(500).json({ error: "Failed to add transaction" });
  }
});

// 👉 Update transaction
app.put("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedTransaction);
  } catch (err) {
    res.status(500).json({ error: "Failed to update transaction" });
  }
});

// 👉 Delete transaction
app.delete("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

// ----------------------------
// Start Server
// ----------------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

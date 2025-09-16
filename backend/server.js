import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// PORT setup (Render will inject process.env.PORT)
const PORT = process.env.PORT || 5000;

// MongoDB URI (Atlas in production, fallback local in dev)
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/expense-tracker";

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",                     // local frontend
    "https://react-expense-tracker-flame.vercel.app" // deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err.message));

// Schema & Model
const transactionSchema = new mongoose.Schema(
  {
    income: { type: Number, default: 0 },
    expense: { type: Number, default: 0 },
    description: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

// Routes
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

app.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

app.put("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTransaction);
  } catch (err) {
    res.status(500).json({ error: "Failed to update transaction" });
  }
});

app.delete("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

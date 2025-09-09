import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  date: { type: String, required: true },
  income: { type: Number, default: 0 },
  expense: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);

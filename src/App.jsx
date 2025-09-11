import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./header";
import Transaction from "./Transaction";
import Table from "./Table";
import IncomeExpenseChart from "./IncomeExpenseChart";

// 🔥 Detect backend URL (local vs deployed)
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // ✅ Load transactions from backend
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/transactions`)
      .then((res) => {
        console.log("📌 API Response:", res.data);
        setTransactions(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error("❌ Error fetching transactions:", err));
  }, []);

  // ✅ Delete transaction
  const handleDelete = async (idx, id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;

    try {
      await axios.delete(`${API_BASE_URL}/transactions/${id}`);
      setTransactions(transactions.filter((_, i) => i !== idx));
      if (editIndex === idx) setEditIndex(null);
    } catch (err) {
      console.error("❌ Error deleting transaction:", err);
    }
  };

  // ✅ Update transaction (set index)
  const handleUpdate = (idx) => {
    setEditIndex(idx);
  };

  // ✅ Add or update transaction
  const handleSave = async (income, expense, description, date) => {
    if (editIndex !== null) {
      // 🔄 Update existing transaction
      const transactionToUpdate = transactions[editIndex];

      try {
        const res = await axios.put(
          `${API_BASE_URL}/transactions/${transactionToUpdate._id}`,
          { income, expense, description, date }
        );

        const updated = [...transactions];
        updated[editIndex] = res.data;
        setTransactions(updated);
        setEditIndex(null);
      } catch (err) {
        console.error("❌ Error updating transaction:", err);
      }
    } else {
      // ➕ Add new transaction
      try {
        const res = await axios.post(`${API_BASE_URL}/transactions`, {
          income,
          expense,
          description,
          date,
        });
        setTransactions([...transactions, res.data]);
      } catch (err) {
        console.error("❌ Error adding transaction:", err);
      }
    }
  };

  return (
    <div className="main">
      <Header />
      <Transaction
        transactions={transactions}
        onSave={handleSave}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
      />
      <Table
        transactions={transactions}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <IncomeExpenseChart transactions={transactions} />
    </div>
  );
}

export default App;
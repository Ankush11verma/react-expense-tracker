import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./header";
import Transaction from "./Transaction";
import Table from "./table";
import IncomeExpenseChart from "./IncomeExpenseChart";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  //✅ Load transactions from backend
  // useEffect(() => {
  //   axios
  //     .get("/transactions")   // 🔥 Removed http://localhost:5000
  //     .then((res) => setTransactions(res.data))
  //     .catch((err) => console.error("Error fetching transactions:", err));
  // }, []);

  useEffect(() => {
    fetch("http://localhost:5000/transactions")
      .then(res => res.json())
      .then(data => {
        console.log(data); // check what you get
        // Ensure it's always an array
        setTransactions(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error(err));
  }, []);

  // ✅ Delete transaction (API + update state)
  const handleDelete = async (idx, id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;

    try {
      await axios.delete(`http://localhost:5000/transactions/${id}`);  // 🔥 Changed here
      setTransactions(transactions.filter((_, i) => i !== idx));
      if (editIndex === idx) setEditIndex(null);
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  // ✅ Set index for editing
  const handleUpdate = (idx) => {
    setEditIndex(idx);
  };

  // ✅ Add or update transaction (API + state)
  const handleSave = async (income, expense, description, date) => {
    if (editIndex !== null) {
      // 🔄 Update existing transaction
      const transactionToUpdate = transactions[editIndex];

      try {
        const res = await axios.put(
          `http://localhost:5000/transactions/${transactionToUpdate._id}`,   // 🔥 Changed here
          { income, expense, description, date }
        );

        const updated = [...transactions];
        updated[editIndex] = res.data;
        setTransactions(updated);
        setEditIndex(null);
      } catch (err) {
        console.error("Error updating transaction:", err);
      }
    } else {
      // ➕ Add new transaction
      try {
        const res = await axios.post("http://localhost:5000/transactions", {   // 🔥 Changed here
          income,
          expense,
          description,
          date,
        });
        setTransactions([...transactions, res.data]);
      } catch (err) {
        console.error("Error adding transaction:", err);
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
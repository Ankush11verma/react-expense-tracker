import React, { useState, useEffect } from "react";

function Transaction({ transactions, onSave, editIndex, setEditIndex }) {
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editIndex !== null) {
      const txn = transactions[editIndex];

      setIncome(txn.income || "");
      setExpense(txn.expense || "");
      setDescription(txn.description || "");

      // ✅ Convert ISO date from MongoDB into yyyy-mm-dd format for input
      if (txn.date) {
        const formattedDate = new Date(txn.date).toISOString().split("T")[0];
        setDate(formattedDate);
      } else {
        setDate("");
      }
    } else {
      setIncome("");
      setExpense("");
      setDescription("");
      setDate("");
    }
  }, [editIndex, transactions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(
      Number(income) || 0,
      Number(expense) || 0,
      description,
      date
    );
    setIncome("");
    setExpense("");
    setDescription("");
    setDate("");
    setEditIndex(null);
  };

  return (
    <form className="transaction" onSubmit={handleSubmit}>
      <label><b>Description</b></label>
      <input
        type="text"
        className="inputClass"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label><b>Date</b></label>
      <input
        type="date"
        className="inputClass"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <label><b>Income</b></label>
      <input
        type="number"
        className="inputClass"
        placeholder="Income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />

      <label><b>Expense</b></label>
      <input
        type="number"
        className="inputClass"
        placeholder="Expense"
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
      />

      <button id="button" type="submit">
        {editIndex !== null ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
}

export default Transaction;

import React, { useState, useEffect } from "react";

function Transaction({ transactions, onSave, editIndex, setEditIndex }) {
    const [income, setIncome] = useState("");
    const [expense, setExpense] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        if (editIndex !== null) {
            setIncome(transactions[editIndex].income);
            setExpense(transactions[editIndex].expense);
            setDescription(transactions[editIndex].description || "");
            setDate(transactions[editIndex].date || "");
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
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
            />
            <input
                type="date"
                placeholder="Date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Income"
                value={income}
                onChange={e => setIncome(e.target.value)}
            />
            <input
                type="number"
                placeholder="Expense"
                value={expense}
                onChange={e => setExpense(e.target.value)}
            />
            <button id="button" type="submit">
                {editIndex !== null ? "Update Transaction" : "Add Transaction"}
            </button>
        </form>
    );
}

export default Transaction;
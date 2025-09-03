import React, { useState } from "react";

function Transaction({ transactions, setTransactions }) {
    const [income, setIncome] = useState("");
    const [expense, setExpense] = useState("");

    const handleAdd = () => {
        if (income || expense) {
            setTransactions([
                ...transactions,
                { income: Number(income) || 0, expense: Number(expense) || 0 }
            ]);
            setIncome("");
            setExpense("");
        }
    };

    return (
        <div className="transaction">
            <input type="number" placeholder="Income" value={income} onChange={e => setIncome(e.target.value)} />

            <input type="number" placeholder="Expense" value={expense} onChange={e => setExpense(e.target.value)} />

            <button id="button" onClick={handleAdd}>AddTransaction</button>
        </div>
    );
}

export default Transaction;
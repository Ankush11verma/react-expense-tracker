import React from "react";

function Table({ transactions }) {
    const totalIncome = transactions.reduce((sum, t) => sum + t.income, 0);
    const totalExpense = transactions.reduce((sum, t) => sum + t.expense, 0);

    return (
        <table border="1" style={{ width: "100%", marginTop: "20px" }}>
            <thead>
                <tr>
                    <th>Income</th>
                    <th>Expense</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((t, idx) => (
                    <tr key={idx}>
                        <td>{t.income}</td>
                        <td>{t.expense}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td><strong>Total Income: {totalIncome}</strong></td>
                    <td><strong>Total Expense: {totalExpense}</strong></td>
                </tr>
            </tfoot>
        </table>
    );
}

export default Table;
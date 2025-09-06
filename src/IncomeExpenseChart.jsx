import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function IncomeExpenseChart({ transactions }) {
    const totalIncome = transactions.reduce((sum, t) => sum + t.income, 0);
    const totalExpense = transactions.reduce((sum, t) => sum + t.expense, 0);

    const data = [
        { name: "Income", value: totalIncome },
        { name: "Expense", value: totalExpense }
    ];

    return (
        <div style={{ width: "100%", height: 300, marginTop: 30 }}>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default IncomeExpenseChart;
import React from "react";

function Table({ transactions, onUpdate, onDelete }) {
  const totalIncome = transactions.reduce((sum, t) => sum + (Number(t.income) || 0), 0);
  const totalExpense = transactions.reduce((sum, t) => sum + (Number(t.expense) || 0), 0);

  // ✅ Format MongoDB ISO Date into yyyy-mm-dd
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toISOString().split("T")[0];
  };

  return (
    <table border="1" style={{ width: "100%", marginTop: "20px" }}>
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Income</th>
          <th>Expense</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t, idx) => (
          <tr key={t._id || idx}>
            <td>{t.description}</td>
            <td>{formatDate(t.date)}</td>
            <td style={{ color: "green" }}>{t.income}</td>
            <td style={{ color: "red" }}>{t.expense}</td>
            <td>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png"
                alt="Update"
                style={{
                  width: "20px",
                  cursor: "pointer",
                  filter:
                    "invert(41%) sepia(98%) saturate(749%) hue-rotate(81deg) brightness(93%) contrast(92%)",
                }}
                onClick={() => onUpdate(idx)} // still use index for editing
              />
            </td>
            <td>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                alt="Delete"
                style={{
                  width: "20px",
                  cursor: "pointer",
                  filter:
                    "invert(18%) sepia(97%) saturate(7492%) hue-rotate(357deg) brightness(97%) contrast(119%)",
                }}
                onClick={() => onDelete(idx, t._id)} // ✅ pass MongoDB _id
              />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="3">
            <strong>Total Income: {totalIncome}</strong>
          </td>
          <td colSpan="3">
            <strong>Total Expense: {totalExpense}</strong>
          </td>
        </tr>
        <tr>
          <td
            colSpan="6"
            style={{
              color:
                totalIncome - totalExpense < 0
                  ? "red"
                  : totalIncome - totalExpense > 0
                  ? "blue"
                  : "inherit",
            }}
          >
            <strong>Balance: {totalIncome - totalExpense}</strong>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default Table;
import { useState } from 'react'
import './App.css'
import Header from './header';
import Transaction from './Transaction';
import Table from './Table';
import IncomeExpenseChart from './IncomeExpenseChart';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleDelete = (idx) => {
    alert("Are you sure you want to delete this transaction?");
    setTransactions(transactions.filter((_, i) => i !== idx));
    if (editIndex === idx) setEditIndex(null);
  };

  const handleUpdate = (idx) => {
    setEditIndex(idx);
  };

  const handleSave = (income, expense, description, date) => {
  if (editIndex !== null) {
    // Update existing transaction
    const updated = [...transactions];
    updated[editIndex] = { income, expense, description, date };
    setTransactions(updated);
    setEditIndex(null);
  } else {
    // Add new transaction
    setTransactions([...transactions, { income, expense, description, date }]);
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

export default App
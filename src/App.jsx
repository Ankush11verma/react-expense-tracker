import { useState } from 'react'
import './App.css'
import Header from './header';
import Transaction from './Transaction';
import Table from './table';

function App() {
  const [transactions, setTransactions] = useState([]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow-lg rounded bg-white">
      <Header />
      <Transaction transactions={transactions} setTransactions={setTransactions} />
      <Table transactions={transactions} />
    </div>
  );
}

export default App
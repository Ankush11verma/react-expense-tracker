import { useState } from 'react'
import './App.css'
import Header from './header';
import Transaction from './Transaction';
import Table from './Table';

function App() {
  const [transactions, setTransactions] = useState([]);

  return (
    <div className="main">
      <Header />
      <Transaction transactions={transactions} setTransactions={setTransactions} />
      <Table transactions={transactions} />
    </div>
  );
}

export default App
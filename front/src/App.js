import React from 'react';
import './style.css';
import Header from './components/header';
import Dashboard from './components/dashboard';

function App() {
  return (
    <div className="app">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;

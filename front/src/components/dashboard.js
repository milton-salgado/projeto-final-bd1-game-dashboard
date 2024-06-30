import React from 'react';
import './../style.css';
import { useEffect, useState } from "react";

// Services
import quantityService from "../services/quantityService";
import summaryService from "../services/summaryService";

const Dashboard = () => {
  const [qtdJogosPlataforma, setQtdJogosPlataforma] = useState([]);

  useEffect(() => {
    quantityService
      .getQuantidadeJogosPlataforma()
      .then((response) => {
        setQtdJogosPlataforma(response?.data);
        console.log(qtdJogosPlataforma);
      })
      .catch((Err) => {
        console.log("Error getQuantidadeJogosPlataforma: " + Err);
      });
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Conteúdo do dashboard vai aqui...</p>
    </div>
  );
};

export default Dashboard;

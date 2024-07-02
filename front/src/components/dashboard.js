import React from 'react';
import './../style.css';

import BarraQtdJogosPlataforma from './barraQtdJogosPlataforma';
import BarraQtdJogosLoja from './barraQtdJogosLoja';
import BarraQtdJogosPublicador from './barraQtdJogosPublicador';
import BarraQtdJogosGenero from './barraQtdJogosGenero';
import TabelaJogosPlataforma from './tabelaJogosPlataforma';


const Dashboard = () => {

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Conteúdo do dashboard vai aqui...</p>
      <BarraQtdJogosPlataforma />
      <BarraQtdJogosLoja />
      <BarraQtdJogosPublicador />
      <BarraQtdJogosGenero />
      <TabelaJogosPlataforma />
    </div>
  );
};

export default Dashboard;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from "react";

// Services
import quantityService from "../services/quantityService";

import { Chart as ChartJS,
    CategoryScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LinearScale
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarraQtdJogosGenero = () => {
  const [qtdJogosGenero, setQtdJogosGenero] = useState([]);

  useEffect(() => {
    quantityService
      .getQuantidadeJogosGenero()
      .then((response) => {
        setQtdJogosGenero(response);
      })
      .catch((Err) => {
        console.log("Error getQuantidadeJogosGenero: " + Err);
      });
  }, []);

  const data = {
    labels: qtdJogosGenero.data?.map((elemento) => elemento.genero),
    datasets: [
      {
        label: 'Quantidade de jogos por genero',
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: qtdJogosGenero.data?.map((elemento) => elemento.quantidade_jogos),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          beginAtZero: true,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '600px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarraQtdJogosGenero;

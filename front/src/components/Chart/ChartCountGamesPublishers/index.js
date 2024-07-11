import React from "react";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { colors } from "../../../utils/constants";

// Services
import quantityService from "../../../services/quantityService";

import {
    Chart as ChartJS,
    CategoryScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LinearScale,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ChartCountGamesPublishers = () => {
    const [qtdJogosPublicador, setQtdJogosPublicador] = useState([]);

    useEffect(() => {
        quantityService
            .getQuantidadeJogosPublicador()
            .then((response) => {
                const dadosFiltrados = response.data.filter(
                    (elemento) => elemento.quantidade_jogos >= 1
                );
                const dadosOrdenados = dadosFiltrados.sort(
                    (a, b) => b.quantidade_jogos - a.quantidade_jogos
                );
                setQtdJogosPublicador({ data: dadosOrdenados });
            })
            .catch((Err) => {
                console.log("Error getQuantidadeJogosPublicador: " + Err);
            });
    }, []);

    const data = {
        labels: qtdJogosPublicador.data?.map((elemento) => elemento.publicador),
        datasets: [
            {
                label: "Quantidade de jogos por publicador",
                backgroundColor: qtdJogosPublicador.data?.map(
                    (_, index) => colors[index % colors.length]
                ),
                borderColor: qtdJogosPublicador.data?.map((_, index) =>
                    colors[index % colors.length].replace("0.6", "1")
                ),
                hoverBackgroundColor: qtdJogosPublicador.data?.map((_, index) =>
                    colors[index % colors.length].replace("0.6", "0.8")
                ),
                hoverBorderColor: qtdJogosPublicador.data?.map((_, index) =>
                    colors[index % colors.length].replace("0.6", "1")
                ),
                borderWidth: 1,
                data: qtdJogosPublicador.data?.map(
                    (elemento) => elemento.quantidade_jogos
                ),
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                align: "start",
                labels: {
                    font: {
                        size: 14,
                        family: "Montserrat",
                        weight: "bold",
                    },
                },
            },
            title: {
                display: true,
                text: "Quantidade de Jogos por Publicador",
                position: "top",
                align: "start",
                font: {
                    size: 18,
                    family: "Montserrat",
                    weight: "bold",
                },
                padding: {
                    top: 10,
                    bottom: 30,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 12,
                        family: "Montserrat",
                    },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    font: {
                        size: 12,
                        family: "Montserrat",
                    },
                },
                grid: {
                    color: "rgba(200, 200, 200, 0.3)",
                },
            },
        },
    };

    return (
        <div
            style={{
                backgroundColor: "#f0f2f5",
                borderRadius: "8px",
                overflowX: "scroll",
                padding: "20px",
            }}
        >
            <div style={{ width: "10000px", height: "400px" }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default ChartCountGamesPublishers;

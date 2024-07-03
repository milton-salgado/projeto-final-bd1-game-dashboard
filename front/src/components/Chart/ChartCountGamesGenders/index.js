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

const ChartCountGamesGenders = () => {
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
                label: "Quantidade de jogos por gênero",
                backgroundColor: qtdJogosGenero.data?.map(
                    (_, index) => colors[index % colors.length]
                ),
                borderColor: qtdJogosGenero.data?.map((_, index) =>
                    colors[index % colors.length].replace("0.6", "1")
                ),
                hoverBackgroundColor: qtdJogosGenero.data?.map((_, index) =>
                    colors[index % colors.length].replace("0.6", "0.8")
                ),
                hoverBorderColor: qtdJogosGenero.data?.map((_, index) =>
                    colors[index % colors.length].replace("0.6", "1")
                ),
                borderWidth: 1,
                data: qtdJogosGenero.data?.map(
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
                text: "Quantidade de Jogos por Gênero",
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
                height: "400px",
                backgroundColor: "#f0f2f5",
                borderRadius: "8px",
                padding: "20px",
            }}
        >
            <Bar data={data} options={options} />
        </div>
    );
};

export default ChartCountGamesGenders;

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

const ChartCountGamesPlatforms = () => {
    const [qtdJogosPlataforma, setQtdJogosPlataforma] = useState([]);

    useEffect(() => {
        quantityService
            .getQuantidadeJogosPlataforma()
            .then((response) => {
                setQtdJogosPlataforma(response);
            })
            .catch((Err) => {
                console.log("Error getQuantidadeJogosPlataforma: " + Err);
            });
    }, []);

    const data = {
        labels: qtdJogosPlataforma.data?.map((elemento) => elemento.plataforma),
        datasets: [
            {
                label: "Quantidade de jogos por plataforma",
                backgroundColor: qtdJogosPlataforma.data?.map(
                    (_, index) => colors[index % colors.length]
                ),
                borderColor: qtdJogosPlataforma.data?.map((_, index) =>
                    colors[index % colors.length].replace("0.6", "1")
                ),
                hoverBackgroundColor: qtdJogosPlataforma.data?.map((_, index) =>
                    colors[index % colors.length].replace("0.6", "0.8")
                ),
                hoverBorderColor: qtdJogosPlataforma.data?.map((_, index) =>
                    colors[index % colors.length].replace("0.6", "1")
                ),
                borderWidth: 1,
                data: qtdJogosPlataforma.data?.map(
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
                        family: "Source Code Pro",
                        weight: "bold",
                    },
                },
            },
            title: {
                display: true,
                text: "Quantidade de Jogos por Plataforma",
                font: {
                    size: 18,
                    family: "Source Code Pro",
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
                        family: "Source Code Pro",
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
                        family: "Source Code Pro",
                    },
                },
                grid: {
                    color: "rgba(200, 200, 200, 0.3)",
                },
            },
        },
    };

    return (
        <div style={{ height: "400px" }}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ChartCountGamesPlatforms;

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

const ChartCountGamesStores = () => {
    const [qtdJogosLoja, setQtdJogosLoja] = useState([]);

    useEffect(() => {
        quantityService
            .getQuantidadeJogosLoja()
            .then((response) => {
                setQtdJogosLoja(response);
            })
            .catch((Err) => {
                console.log("Error getQuantidadeJogosLoja: " + Err);
            });
    }, []);

    const data = {
        labels: qtdJogosLoja.data?.map((elemento) => elemento.loja),
        datasets: [
            {
                label: "Quantidade de jogos por loja",
                backgroundColor: qtdJogosLoja.data?.map(
                    (_, index) => colors[index % colors.length]
                ),
                borderColor: qtdJogosLoja.data?.map((_, index) =>
                    colors[index % colors.length].replace("0.6", "1")
                ),
                hoverBackgroundColor: qtdJogosLoja.data?.map((_, index) =>
                    colors[index % colors.length].replace("0.6", "0.8")
                ),
                hoverBorderColor: qtdJogosLoja.data?.map((_, index) =>
                    colors[index % colors.length].replace("0.6", "1")
                ),
                borderWidth: 1,
                data: qtdJogosLoja.data?.map(
                    (elemento) => elemento.total_vendas
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
                text: "Quantidade de Jogos por Loja",
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

export default ChartCountGamesStores;

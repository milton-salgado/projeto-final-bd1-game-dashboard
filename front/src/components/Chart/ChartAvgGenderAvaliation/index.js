import React from "react";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { colors } from "../../../utils/constants";

// Services
import summaryService from "../../../services/summaryService";

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

const ChartAvgGenderAvaliation = () => {
    const [avgGeneroAvaliation, setAvgGeneroAvaliation] = useState([]);

    useEffect(() => {
        summaryService
            .getMediaAvaliacaoGenero()
            .then((response) => {
                const dadosFiltrados = response.data.filter(
                    (elemento) => elemento.media_avaliacao >= 3
                );
                const dadosOrdenados = dadosFiltrados.sort(
                    (a, b) => b.media_avaliacao - a.media_avaliacao
                );
                setAvgGeneroAvaliation({ data: dadosOrdenados });
            })
            .catch((err) => {
                console.log("Error getMediaAvaliacaoGenero: " + err);
            });
    }, []);

    const data = {
        labels: avgGeneroAvaliation.data?.map((elemento) => elemento.genero),
        datasets: [
            {
                label: "Média de avaliação por gênero",
                backgroundColor: avgGeneroAvaliation.data?.map(
                    (_, index) => colors[index % colors.length]
                ),
                borderColor: avgGeneroAvaliation.data?.map((_, index) =>
                    colors[index % colors.length].replace("0.6", "1")
                ),
                hoverBackgroundColor: avgGeneroAvaliation.data?.map(
                    (_, index) =>
                        colors[index % colors.length].replace("0.6", "0.8")
                ),
                hoverBorderColor: avgGeneroAvaliation.data?.map((_, index) =>
                    colors[index % colors.length].replace("0.6", "1")
                ),
                borderWidth: 1,
                data: avgGeneroAvaliation.data?.map(
                    (elemento) => elemento.media_avaliacao
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
                text: "Média de Avaliação por Gênero",
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
                beginAtZero: false,
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

export default ChartAvgGenderAvaliation;

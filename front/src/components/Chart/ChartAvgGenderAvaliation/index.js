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
                setAvgGeneroAvaliation(response);
            })
            .catch((Err) => {
                console.log("Error getMediaAvaliacaoGenero: " + Err);
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
                hoverBackgroundColor: avgGeneroAvaliation.data?.map((_, index) =>
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
                        family: "Source Code Pro",
                        weight: "bold",
                    },
                },
            },
            title: {
                display: true,
                text: "Media de avaliação por gênero",
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
                beginAtZero: false,
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

export default ChartAvgGenderAvaliation;
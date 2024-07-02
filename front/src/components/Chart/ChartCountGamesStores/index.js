import React from "react";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { colors } from "../../../utils/constants";

// Services
import quantityService from "../../../services/quantityService";

import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

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
        layout: {
            padding: {
                left: 50,
                right: 50,
                top: 0,
                bottom: 0,
            },
        },
        plugins: {
            legend: {
                position: "left",
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
                text: "Quantidade de Jogos por Loja",
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
        animation: {
            animateRotate: true,
            animateScale: true,
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
            <Pie data={data} options={options} />
        </div>
    );
};

export default ChartCountGamesStores;

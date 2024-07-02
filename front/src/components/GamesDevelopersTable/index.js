import React, { useEffect, useState } from "react";
import summaryService from "../../services/summaryService";
import {
    StyledContainer,
    StyledSearchInput,
    StyledTable,
    StyledPagination,
} from "./styles";

const GamesDeveloperTable = () => {
    const [jogosDesenvolvedor, setJogosDesenvolvedor] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [linhasPorPagina] = useState(50);
    const [termoPesquisado, setTermoPesquisado] = useState("");

    useEffect(() => {
        summaryService
            .getJogosPublicadosDesenvolvedor()
            .then((response) => {
                setJogosDesenvolvedor(response);
            })
            .catch((Err) => {
                console.log("Error getJogosPublicadosDesenvolvedor: " + Err);
            });
    }, []);

    const renderRows = () => {
        let dadosFiltrados = jogosDesenvolvedor.data;

        if (termoPesquisado) {
            dadosFiltrados = dadosFiltrados.filter((item) =>
                item.desenvolvedor.toLowerCase().includes(termoPesquisado.toLowerCase())
            );
        }

        const ultimeIndice = paginaAtual * linhasPorPagina;
        const indexOfFirstRow = ultimeIndice - linhasPorPagina;
        const currentRows = dadosFiltrados?.slice(
            indexOfFirstRow,
            ultimeIndice
        );

        return currentRows?.map((item, index) => (
            <tr key={index}>
                <td>{item.desenvolvedor}</td>
                <td>{item.jogos_desenvolvidos}</td>
            </tr>
        ));
    };

    const totalPaginas = Math.ceil(
        (jogosDesenvolvedor.data?.filter((item) =>
            item.desenvolvedor.toLowerCase().includes(termoPesquisado.toLowerCase())
        )?.length || 0) / linhasPorPagina
    );

    const paginate = (numeroPagina) => setPaginaAtual(numeroPagina);

    const numeroPaginas = [];
    for (let i = 1; i <= totalPaginas; i++) {
        numeroPaginas.push(i);
    }

    const handleSearchChange = (event) => {
        setTermoPesquisado(event.target.value);
        setPaginaAtual(1);
    };

    return (
        <StyledContainer>
            <StyledSearchInput
                type="text"
                placeholder="Pesquisar desenvolvedor..."
                value={termoPesquisado}
                onChange={handleSearchChange}
            />
            <StyledTable striped bordered hover>
                <thead>
                    <tr>
                        <th>Desenvolvedor</th>
                        <th>Quantidade de jogos publicados</th>
                    </tr>
                </thead>
                <tbody>{renderRows()}</tbody>
            </StyledTable>
            <StyledPagination>
                {numeroPaginas.map((numero) => (
                    <button
                        key={numero}
                        onClick={() => paginate(numero)}
                        className={`page-link ${
                            paginaAtual === numero ? "active" : ""
                        }`}
                    >
                        {numero}
                    </button>
                ))}
            </StyledPagination>
        </StyledContainer>
    );
};

export default GamesDeveloperTable;

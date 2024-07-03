import React, { useEffect, useState } from "react";
import summaryService from "../../../services/summaryService";
import {
    StyledContainer,
    StyledTitle,
    StyledSearchInput,
    StyledTable,
    StyledPagination,
} from "../style";

const GamesGendersTable = () => {
    const [jogosGeneros, setJogosGeneros] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [linhasPorPagina] = useState(50);
    const [termoPesquisado, setTermoPesquisado] = useState("");

    useEffect(() => {
        summaryService
            .getJogosPorGenero()
            .then((response) => {
                setJogosGeneros(response);
            })
            .catch((Err) => {
                console.log("Error getJogosPorGenero: " + Err);
            });
    }, []);

    const renderRows = () => {
        let dadosFiltrados = jogosGeneros.data;

        if (termoPesquisado) {
            dadosFiltrados = dadosFiltrados.filter((item) =>
                item.genero
                    .toLowerCase()
                    .includes(termoPesquisado.toLowerCase())
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
                <td>{item.genero}</td>
                <td>{item.jogos}</td>
            </tr>
        ));
    };

    const totalPaginas = Math.ceil(
        (jogosGeneros.data?.filter((item) =>
            item.genero.toLowerCase().includes(termoPesquisado.toLowerCase())
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
            <StyledTitle>Jogos por Gêneros</StyledTitle>
            <StyledSearchInput
                type="text"
                placeholder="Pesquisar gênero..."
                value={termoPesquisado}
                onChange={handleSearchChange}
            />
            <StyledTable striped bordered hover>
                <thead>
                    <tr>
                        <th>Gênero</th>
                        <th>Jogos</th>
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

export default GamesGendersTable;

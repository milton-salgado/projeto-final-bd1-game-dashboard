import React, { useEffect, useState } from "react";
import summaryService from "../../services/summaryService";
import {
    StyledContainer,
    StyledSearchInput,
    StyledTable,
    StyledPagination,
} from "./styles";

const GamePlatformsTable = () => {
    const [jogosPlataforma, setJogosPlataforma] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [linhasPorPagina] = useState(50);
    const [termoPesquisado, setTermoPesquisado] = useState("");

    useEffect(() => {
        summaryService
            .getPlataformasSuportadasJogo()
            .then((response) => {
                setJogosPlataforma(response);
            })
            .catch((Err) => {
                console.log("Error getPlataformasSuportadasJogo: " + Err);
            });
    }, []);

    const renderRows = () => {
        let dadosFiltrados = jogosPlataforma.data;

        if (termoPesquisado) {
            dadosFiltrados = dadosFiltrados.filter((item) =>
                item.jogo.toLowerCase().includes(termoPesquisado.toLowerCase())
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
                <td>{item.jogo}</td>
                <td>{item.plataformas}</td>
            </tr>
        ));
    };

    const totalPaginas = Math.ceil(
        (jogosPlataforma.data?.filter((item) =>
            item.jogo.toLowerCase().includes(termoPesquisado.toLowerCase())
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
                placeholder="Pesquisar jogo..."
                value={termoPesquisado}
                onChange={handleSearchChange}
            />
            <StyledTable striped bordered hover>
                <thead>
                    <tr>
                        <th>Jogo</th>
                        <th>Plataformas Suportadas</th>
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

export default GamePlatformsTable;

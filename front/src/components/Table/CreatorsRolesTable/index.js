import React, { useEffect, useState } from "react";
import summaryService from "../../../services/summaryService";
import {
    StyledContainer,
    StyledSearchInput,
    StyledTable,
    StyledPagination,
    StyledTitle,
} from "../style";

const CreatorsRolesTable = () => {
    const [funcoesCriador, setFuncoesCriador] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [linhasPorPagina] = useState(50);
    const [termoPesquisado, setTermoPesquisado] = useState("");

    useEffect(() => {
        summaryService
            .getFuncoesCriadores()
            .then((response) => {
                setFuncoesCriador(response);
            })
            .catch((Err) => {
                console.log("Error getFuncoesCriadores: " + Err);
            });
    }, []);

    const renderRows = () => {
        let dadosFiltrados = funcoesCriador.data;

        if (termoPesquisado) {
            dadosFiltrados = dadosFiltrados.filter((item) =>
                item.criador
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
                <td>{item.criador}</td>
                <td>{item.funcoes}</td>
            </tr>
        ));
    };

    const totalPaginas = Math.ceil(
        (funcoesCriador.data?.filter((item) =>
            item.criador.toLowerCase().includes(termoPesquisado.toLowerCase())
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
            <StyledTitle>Funções Organizadas por Criador</StyledTitle>
            <StyledSearchInput
                type="text"
                placeholder="Pesquisar criador..."
                value={termoPesquisado}
                onChange={handleSearchChange}
            />
            <StyledTable striped bordered hover>
                <thead>
                    <tr>
                        <th>Criador</th>
                        <th>Funções</th>
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

export default CreatorsRolesTable;

// styles.js
import styled from "styled-components";
import Table from "react-bootstrap/Table";

export const StyledContainer = styled.div`
    padding: 20px;
`;

export const StyledSearchInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 16px;
    &:focus {
        outline: none;
        border-color: #495057;
    }
`;

export const StyledTable = styled(Table)`
    width: 100%;

    thead {
        background-color: #343a40;
        color: white;
        th {
            font-weight: bold;
            vertical-align: middle;
            text-align: left;
            padding: 20px 10px;
        }
    }

    tbody {
        tr {
            height: 40px;
            &:nth-of-type(odd) {
                background-color: #e9ecef;
            }
            &:hover {
                background-color: #adb5bd;
                cursor: pointer;
            }

            td {
                vertical-align: middle;
                padding: 20px 10px;
            }
        }
    }
`;

export const StyledPagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    flex-wrap: wrap;

    .page-link {
        margin: 5px;
        padding: 10px 15px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        background-color: #f8f9fa;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;

        &:hover {
            background-color: #adb5bd;
        }

        &.active {
            background-color: #495057;
            color: white;
            border-color: #495057;
        }
    }

    @media (max-width: 768px) {
        .page-link {
            padding: 8px 12px;
            font-size: 14px;
        }
    }

    @media (max-width: 480px) {
        .page-link {
            padding: 6px 10px;
            font-size: 12px;
        }
    }
`;

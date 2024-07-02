import styled from "styled-components";
import Table from "react-bootstrap/Table";

export const StyledContainer = styled.div`
    background-color: #f0f2f5;
    padding: 20px;
    border-radius: 8px;
`;

export const StyledTitle = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #535353;
`;

export const StyledSearchInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 16px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
    }
`;

export const StyledTable = styled(Table)`
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    thead {
        background-color: #343a40;
        color: white;
        th {
            font-weight: bold;
            vertical-align: middle;
            text-align: left;
            padding: 15px;
        }
    }

    tbody {
        tr {
            height: 50px;
            &:nth-of-type(odd) {
                background-color: #f8f9fa;
            }
            &:hover {
                background-color: #dee2e6;
                cursor: pointer;
            }

            td {
                vertical-align: middle;
                padding: 15px;
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
        background-color: #fff;
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;

        &:hover {
            background-color: #adb5bd;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        &.active {
            background-color: #007bff;
            color: white;
            border-color: #007bff;
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

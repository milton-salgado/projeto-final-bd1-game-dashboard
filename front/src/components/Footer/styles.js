import styled from "styled-components";

export const StyledFooter = styled.footer`
    background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
    flex-wrap: wrap;

    @media (max-width: 768px) {
        height: auto;
        flex-direction: column;
        justify-content: space-evenly;
    }
`;

export const StyledFooterText = styled.p`
    margin: 0 15px;
    font-size: 18px;
    color: #343a40;
    font-family: "Poppins", sans-serif;
    font-weight: 400;

    @media (max-width: 768px) {
        margin: 5px 0;
        font-size: 16px;
    }
`;

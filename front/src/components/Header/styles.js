import styled from "styled-components";

export const StyledHeader = styled.header`
    background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
    height: 20vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        height: 25vh;
        flex-direction: column;
        justify-content: space-evenly;
    }
`;

export const StyledLogo = styled.img`
    height: 64px;
    width: 64px;
    margin-right: 20px;

    @media (max-width: 768px) {
        margin-bottom: 10px;
        width: 56px;
        height: 56px;
    }
`;

export const StyledTitle = styled.h1`
    font-size: 36px;
    text-align: center;
    color: #343a40;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

    @media (max-width: 768px) {
        font-size: 28px;
    }
`;

export const NavLinks = styled.nav`
    display: flex;
    gap: 15px;

    a {
        text-decoration: none;
        color: #343a40;
        font-size: 18px;
        transition: color 0.3s;

        &:hover {
            color: #007bff;
        }

        @media (max-width: 768px) {
            font-size: 16px;
        }
    }
`;

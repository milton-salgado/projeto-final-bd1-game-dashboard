import React from "react";
import { StyledHeader, StyledTitle, StyledLogo } from "./styles.js";

const Header = () => {
    return (
        <StyledHeader className="header">
            <StyledTitle>Games Dashboard</StyledTitle>
            <StyledLogo src="assets/images/logo.png" alt="Games logo" />
        </StyledHeader>
    );
};

export default Header;

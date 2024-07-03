import React from "react";
import { StyledFooter, StyledFooterText } from "./styles.js";

const Footer = () => {
    return (
        <StyledFooter>
            <StyledFooterText>
                Milton Salgado Leandro - Desenvolvedor Web Full Stack /
                Organizador e Líder de Projeto
            </StyledFooterText>
            <StyledFooterText>
                Pedro Henrique Honorio Saito - Especialista em Banco de Dados e
                Servidores / Desenvolvedor Back-End
            </StyledFooterText>
            <StyledFooterText>
                Luiz Eduardo Azevedo Brasil - Desenvolvedor Web Full Stack /
                Especialista em Integração
            </StyledFooterText>
            <StyledFooterText>
                Nícolas da Mota Arruda - Modelista de Banco de Dados /
                Especialista em Testes de Projeto
            </StyledFooterText>
            <StyledFooterText>
                Eduardo Gabriel Teixeira Barros - Analista de Documentação /
                Modelista de Banco de Dados
            </StyledFooterText>
        </StyledFooter>
    );
};

export default Footer;

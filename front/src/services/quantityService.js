import api from "./api";

export default {
  async getQuantidadeJogosPlataforma() {
    try {
      const response = api.get(`/quantidade/quantidade_jogos_plataforma`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async getQuantidadeJogosLoja() {
    try {
      const response = api.get(`/quantidade/quantidade_jogos_vendidos_loja`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async getQuantidadeJogosPublicador() {
    try {
      const response = api.get(`/quantidade/quantidade_jogos_publicador`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async getQuantidadeJogosGenero() {
    try {
      const response = api.get(`/quantidade/quantidade_jogos_por_genero`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

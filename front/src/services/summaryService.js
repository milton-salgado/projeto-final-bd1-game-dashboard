import api from "./api";

export default {
  async getMediaAvaliacaoGenero() {
    try {
      const response = api.get(`/resumo/media_avaliacao_genero`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async getJogosPublicadosDesenvolvedor() {
    try {
      const response = api.get(`/resumo/jogos_publicados_desenvolvedor`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async getPlataforomasSuportadasJogo() {
    try {
      const response = api.get(`/resumo/plataformas_suportadas_jogo`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async getFuncoesCriadores() {
    try {
      const response = api.get(`/resumo/funcoes_criadores`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async getJogosPorGenero() {
    try {
      const response = api.get(`/resumo/jogos_por_genero`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

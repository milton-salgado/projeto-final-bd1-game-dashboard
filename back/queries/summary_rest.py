from sqlalchemy import text

def format_res(res, target, max_len):
    cols = list(res.keys())
    retval = []
    count = 0
    for r in res:
        if count > max_len:
            break
        item = {}
        for k in range(len(r)):
            item[cols[k]] = r[k]
        target.append(item)
        count += 1

def register_calls(app, conn):
    @app.get("/resumo/media_avaliacao_genero")
    async def media_avaliacao_genero():
        query = """
        SELECT g.nome AS genero, AVG(j.avaliacao) AS media_avaliacao
        FROM Genero g
        JOIN (SELECT * FROM Jogo WHERE avaliacao IS NOT NULL) j ON j.id IN (SELECT e.idJogo FROM Especificacao e WHERE e.idGenero = g.id)
        GROUP BY g.nome;
        """
        result = conn.execute(text(query))
        history = []
        format_res(result, history, 10**30)
        return history

    @app.get("/resumo/jogos_publicados_desenvolvedor")
    async def jogos_publicados_desenvolvedor():
        query = """
        SELECT d.nome AS desenvolvedor, COUNT(j.id) AS jogos_desenvolvidos
        FROM Desenvolvedor d
        JOIN Desenvolvimento dev ON d.id = dev.idDesenvolvedor
        JOIN Jogo j ON j.id = dev.idJogo AND j.avaliacao > (SELECT AVG(avaliacao) FROM Jogo)
        GROUP BY d.nome;
        """
        result = conn.execute(text(query))
        history = []
        format_res(result, history, 10**30)
        return history

    @app.get("/resumo/plataformas_suportadas_jogo")
    async def plataformas_suportadas_jogo():
        query = """
        SELECT j.nome AS jogo, GROUP_CONCAT(p.nome SEPARATOR ', ') AS plataformas
        FROM Jogo j
        JOIN Versao v ON j.id = v.idJogo
        JOIN Plataforma p ON v.idPlataforma = p.id
        GROUP BY j.nome;
        """
        result = conn.execute(text(query))
        history = []
        format_res(result, history, 10**30)
        return history

    @app.get("/resumo/funcoes_criadores")
    async def funcoes_criadores():
        query = """
        SELECT c.nome AS criador, GROUP_CONCAT(f.nome SEPARATOR ', ') AS funcoes
        FROM Criador c
        JOIN Atividade a ON c.id = a.idCriador
        JOIN Funcao f ON a.idFuncao = f.id
        GROUP BY c.nome;
        """
        result = conn.execute(text(query))
        history = []
        format_res(result, history, 10**30)
        return history
    
    @app.get("/resumo/jogos_por_genero")
    async def jogos_por_genero():
        query = """
        SELECT g.nome AS genero, GROUP_CONCAT(j.nome SEPARATOR ', ') AS jogos
        FROM Genero g
        JOIN Especificacao e ON g.id = e.idGenero
        JOIN Jogo j ON e.idJogo = j.id
        GROUP BY g.nome;
        """
        result = conn.execute(text(query))
        history = []
        format_res(result, history, 10**30)
        return history

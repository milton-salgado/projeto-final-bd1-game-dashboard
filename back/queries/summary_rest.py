from fastapi import FastAPI

def register_calls(app, conn):
    @app.get("/resumo/quantidade_jogos_plataforma")
    async def quantidade_jogos_plataforma():
        query = """
        SELECT p.nome AS plataforma, COUNT(j.id) AS quantidade_jogos
        FROM Plataforma p
        LEFT JOIN Versao v ON p.id = v.idPlataforma
        LEFT JOIN Jogo j ON v.idJogo = j.id
        GROUP BY p.nome;
        """
        result = conn.execute(query)
        return result.fetchall()

    @app.get("/resumo/jogos_mais_vendidos_loja")
    async def jogos_mais_vendidos_loja():
        query = """
        SELECT l.nome AS loja, j.nome AS jogo, SUM(v.qtd_vendida) AS total_vendas
        FROM Venda v
        JOIN Jogo j ON v.idJogo = j.id
        JOIN Loja l ON v.idLoja = l.id
        GROUP BY l.nome, j.nome
        ORDER BY total_vendas DESC
        LIMIT 10;
        """
        result = conn.execute(query)
        return result.fetchall()

    @app.get("/resumo/media_avaliacao_genero")
    async def media_avaliacao_genero():
        query = """
        SELECT g.nome AS genero, AVG(j.avaliacao) AS media_avaliacao
        FROM Genero g
        JOIN (SELECT * FROM Jogo WHERE avaliacao IS NOT NULL) j ON j.id IN (SELECT e.idJogo FROM Especificacao e WHERE e.idGenero = g.id)
        GROUP BY g.nome;
        """
        result = conn.execute(query)
        return result.fetchall()

    @app.get("/resumo/jogos_publicados_desenvolvedor")
    async def jogos_publicados_desenvolvedor():
        query = """
        SELECT d.nome AS desenvolvedor, COUNT(j.id) AS jogos_publicados
        FROM Desenvolvedor d
        JOIN Desenvolvimento dev ON d.id = dev.idDesenvolvedor
        JOIN Jogo j ON j.id = dev.idJogo AND j.avaliacao > (SELECT AVG(avaliacao) FROM Jogo)
        GROUP BY d.nome;
        """
        result = conn.execute(query)
        return result.fetchall()

    @app.get("/resumo/plataformas_suportadas_jogo")
    async def plataformas_suportadas_jogo():
        query = """
        SELECT j.nome AS jogo, GROUP_CONCAT(p.nome SEPARATOR ', ') AS plataformas
        FROM Jogo j
        JOIN Versao v ON j.id = v.idJogo
        JOIN Plataforma p ON v.idPlataforma = p.id
        GROUP BY j.nome;
        """
        result = conn.execute(query)
        return result.fetchall()

    @app.get("/resumo/quantidade_jogos_publicador")
    async def quantidade_jogos_publicador():
        query = """
        SELECT pub.nome AS publicador, COUNT(j.id) AS quantidade_jogos
        FROM Jogo j
        JOIN Publicacao p ON j.id = p.idJogo
        JOIN Publicador pub ON p.idPublicador = pub.id
        GROUP BY pub.nome;
        """
        result = conn.execute(query)
        return result.fetchall()

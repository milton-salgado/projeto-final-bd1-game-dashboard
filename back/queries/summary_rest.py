from fastapi import FastAPI

def register_calls(app, conn):
    @app.get("/resumo/quantidade_jogos_plataforma")
    async def quantidade_jogos_plataforma():
        query = """
        SELECT p.nome AS plataforma, COUNT(j.id) AS quantidade_jogos
        FROM Jogo j
        JOIN Versao v ON j.id = v.jogo_id
        JOIN Plataforma p ON v.plataforma_id = p.id
        GROUP BY p.nome;
        """
        result = conn.execute(query)
        return result.fetchall()

    @app.get("/resumo/jogos_mais_vendidos_loja")
    async def jogos_mais_vendidos_loja():
        query = """
        SELECT l.nome AS loja, j.nome AS jogo, SUM(v.qtd_vendida) AS total_vendas
        FROM Venda v
        JOIN Jogo j ON v.jogo_id = j.id
        JOIN Loja l ON v.loja_id = l.id
        GROUP BY l.nome, j.nome
        ORDER BY total_vendas DESC;
        """
        result = conn.execute(query)
        return result.fetchall()

    @app.get("/resumo/media_avaliacao_genero")
    async def media_avaliacao_genero():
        query = """
        SELECT g.nome AS genero, AVG(j.avaliacao) AS media_avaliacao
        FROM Jogo j
        JOIN Especificacao e ON j.id = e.jogo_id
        JOIN Genero g ON e.genero_id = g.id
        GROUP BY g.nome;
        """
        result = conn.execute(query)
        return result.fetchall()

    @app.get("/resumo/jogos_publicados_desenvolvedor")
    async def jogos_publicados_desenvolvedor():
        query = """
        SELECT d.nome AS desenvolvedor, COUNT(j.id) AS jogos_publicados
        FROM Jogo j
        JOIN Desenvolvimento dev ON j.id = dev.jogo_id
        JOIN Desenvolvedor d ON dev.desenvolvedor_id = d.id
        GROUP BY d.nome;
        """
        result = conn.execute(query)
        return result.fetchall()

    @app.get("/resumo/plataformas_suportadas_jogo")
    async def plataformas_suportadas_jogo():
        query = """
        SELECT j.nome AS jogo, GROUP_CONCAT(p.nome SEPARATOR ', ') AS plataformas
        FROM Jogo j
        JOIN Versao v ON j.id = v.jogo_id
        JOIN Plataforma p ON v.plataforma_id = p.id
        GROUP BY j.nome;
        """
        result = conn.execute(query)
        return result.fetchall()

    @app.get("/resumo/quantidade_jogos_publicador")
    async def quantidade_jogos_publicador():
        query = """
        SELECT pub.nome AS publicador, COUNT(j.id) AS quantidade_jogos
        FROM Jogo j
        JOIN Publicacao p ON j.id = p.jogo_id
        JOIN Publicador pub ON p.publicador_id = pub.id
        GROUP BY pub.nome;
        """
        result = conn.execute(query)
        return result.fetchall()

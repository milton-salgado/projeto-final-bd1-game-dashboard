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
    @app.get("/quantidade/quantidade_jogos_plataforma")
    async def quantidade_jogos_plataforma():
        query = """
        SELECT p.nome AS plataforma, COUNT(j.id) AS quantidade_jogos
        FROM Plataforma p
        LEFT JOIN Versao v ON p.id = v.idPlataforma
        LEFT JOIN Jogo j ON v.idJogo = j.id
        GROUP BY p.nome;
        """
        result = conn.execute(text(query))
        history = []
        format_res(result, history, 10**30)
        return history

    @app.get("/quantidade/quantidade_jogos_vendidos_loja")
    async def jogos_mais_vendidos_loja():
        query = """
        SELECT l.nome AS loja, COUNT(idLoja) AS total_vendas
        FROM Venda v
        JOIN Jogo j ON v.idJogo = j.id
        JOIN Loja l ON v.idLoja = l.id
        GROUP BY l.id
        ORDER BY total_vendas DESC
        """
        result = conn.execute(text(query))
        history = []
        format_res(result, history, 10**30)
        return history

    @app.get("/quantidade/quantidade_jogos_publicador")
    async def quantidade_jogos_publicador():
        query = """
        SELECT pub.nome AS publicador, COUNT(j.id) AS quantidade_jogos
        FROM Jogo j
        JOIN Publicacao p ON j.id = p.idJogo
        JOIN Publicador pub ON p.idPublicador = pub.id
        GROUP BY pub.nome;
        """
        result = conn.execute(text(query))
        history = []
        format_res(result, history, 10**30)
        return history
    
    @app.get("/quantidade/quantidade_jogos_por_genero")
    async def quantidade_jogos_por_genero():
        query = """
        SELECT g.nome AS genero, COUNT(j.id) AS quantidade_jogos
        FROM Genero g
        JOIN Especificacao e ON g.id = e.idGenero
        JOIN Jogo j ON e.idJogo = j.id
        GROUP BY g.nome;
        """
        result = conn.execute(text(query))
        history = []
        format_res(result, history, 10**30)
        return history

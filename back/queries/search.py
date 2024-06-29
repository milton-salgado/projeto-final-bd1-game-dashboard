from fastapi import Query
from typing import Optional

def register_calls(app, conn):
    @app.get("/search/games")
    async def search_games(name: Optional[str] = Query(None)):
        query = """
        SELECT id, nome, descricao, metacritic
        FROM Jogo
        WHERE nome LIKE :name
        """
        result = conn.execute(query, {"name": f"%{name}%"})
        return result.fetchall()

    @app.get("/search/platforms")
    async def search_platforms(name: Optional[str] = Query(None)):
        query = """
        SELECT id, nome, descricao, anoDeInicio, anoDeFim
        FROM Plataforma
        WHERE nome LIKE :name
        """
        result = conn.execute(query, {"name": f"%{name}%"})
        return result.fetchall()

    @app.get("/search/games_by_genre")
    async def search_games_by_genre(genre: Optional[str] = Query(None)):
        query = """
        SELECT j.id, j.nome, j.descricao, j.metacritic
        FROM Jogo j
        JOIN Especificacao e ON j.id = e.idJogo
        JOIN Genero g ON e.idGenero = g.id
        WHERE g.nome LIKE :genre
        """
        result = conn.execute(query, {"genre": f"%{genre}%"})
        return result.fetchall()

    @app.get("/search/developers")
    async def search_developers(name: Optional[str] = Query(None)):
        query = """
        SELECT id, nome, imagem, descricao
        FROM Desenvolvedor
        WHERE nome LIKE :name
        """
        result = conn.execute(query, {"name": f"%{name}%"})
        return result.fetchall()

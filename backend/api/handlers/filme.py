import os
import json, hashlib, time
from http.server import SimpleHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
from infra.database import *
from infra.users_database import *
from infra.actorsDirectors import *
from infra.genresProducers import *
from api.jwt import *


def get_Listagem(handler):
    filmes = loadFilminhos()
    handler._send_json(filmes)

def get_Atores(handler):
    atores = loadActorsDirector("ator")
    handler._send_json(atores)

def get_Diretores(handler):
    diretores = loadActorsDirector("diretor")
    handler._send_json(diretores)

def get_Categorias(handler):
    categorias = loadGenresProducer("categoria")
    handler._send_json(categorias)

def get_Produtoras(handler):
    produtoras = loadGenresProducer("produtora")
    handler._send_json(produtoras)

def get_Linguagem(handler):
    linguagens = loadGenresProducer("linguagem")
    handler._send_json(linguagens)

def get_Pais(handler):
    paises = loadGenresProducer("pais")
    handler._send_json(paises)

def get_FilmesPendentes(handler):
    header_auth = handler.headers.get("Authorization", "")

    if not header_auth.startswith("Bearer "):
        handler._send_json({"error": "Token não informado"}, 401)
        return

    token = header_auth.split(" ")[1]
    payload = verify_jwt(token)
    print(token)
    if not payload or payload.get("role") != "admin":
        handler._send_json({"error": "Acesso permitido apenas para admin"}, 403)
        return

    filmes = loadFilminhosPendentes() 

    handler._send_json(filmes)

def get_Filmes(handler):
    query_params = parse_qs(urlparse(handler.path).query)

    try:
        id = int(query_params.get('id', [''])[0])
    except:
        handler._send_json({"error": "ID inválido"}, 400)
        return

    filme = loadFilmini(id)
    print(filme)

    handler._send_json(filme)

def post_AddCat(handler):
    header_auth = handler.headers.get("Authorization", "")
    content_length = int(handler.headers['Content-length'])
    body = handler.rfile.read(content_length).decode('utf-8')
    form_data = parse_qs(body)

    propriedade = form_data.get('cat', [""])[0]
    nome = str(form_data.get('nome', [""])[0])

    print("Data form:")
    print("Propriedade:", propriedade)
    print("Nome", nome)
    r = "" 
    tabela = ""

    match propriedade:
        case "Atores Principais":
            tabela = "ator"
            name = nome.split()
            print(name[0], name[1])
            r = insertActorDirector(tabela, name[0], name[1])
        case "Diretores":
            tabela = "diretor"
            name = nome.split()
            r = insertActorDirector(tabela, name[0], name[1])
        case "Linguagem":
            tabela = "linguagem"
            r = insertGenresProducer(tabela, nome)
        case "País de Origem":
            tabela = "pais"
            r = insertGenresProducer(tabela, nome)
        case "Produtora":
            tabela = "produtora"
            r = insertGenresProducer(tabela, nome)
        case "Categorias":
            tabela = "categoria"
            r = insertGenresProducer(tabela, nome)
    
    print(tabela, r)

    if auth_token(header_auth):
        handler._send_json(r)
    else:
        handler._send_json({"error": "Token inválido ou expirado"}, 401)


def post_Cadastrani(handler):
    header_auth = handler.headers.get("Authorization", "")

    if not auth_token(header_auth):
        handler._send_json({"error": "Token inválido ou expirado"}, 401)
        return

    content_length = int(handler.headers.get('Content-Length', 0))
    body = handler.rfile.read(content_length).decode('utf-8')

    try:
        data = json.loads(body)
    except:
        handler._send_json({"error": "JSON inválido"}, 400)
        return

    # --- Diretor: busca pelo nome ou insere se não existir ---
    diretores_ids = []
    diretor_nome = data.get("diretor_nome", "").strip()
    if diretor_nome:
        id_dir = getActorDirectorByName("diretor", diretor_nome)
        if id_dir is None:
            id_dir = insertActorDirectorReturnId("diretor", diretor_nome)
        diretores_ids = [id_dir]

    # --- Ator: busca pelo nome ou insere se não existir ---
    atores_ids = []
    ator_nome = data.get("ator_nome", "").strip()
    if ator_nome:
        id_ator = getActorDirectorByName("ator", ator_nome)
        if id_ator is None:
            id_ator = insertActorDirectorReturnId("ator", ator_nome)
        atores_ids = [id_ator]

    # --- Produtora: busca pelo nome ou insere se não existir ---
    produtoras_ids = []
    id_produtora_principal = None
    produtora_nome = data.get("produtora_nome", "").strip()
    if produtora_nome:
        id_prod = getProducerByName(produtora_nome)
        if id_prod is None:
            from infra.genresProducers import insertGenresProducer
            insertGenresProducer("produtora", produtora_nome)
            id_prod = getProducerByName(produtora_nome)
        if id_prod:
            produtoras_ids = [id_prod]
            id_produtora_principal = id_prod

    # --- Demais campos ---
    categorias_ids = data.get("categoria_id", [])
    linguagens_ids = data.get("linguagem_id", [])
    paises_ids     = data.get("pais_origem_id", [])

    try:
        orcamento = int(str(data.get("orcamento", 0)).replace(".", "").replace(",", "").replace("R$", "").strip())
    except:
        orcamento = 0

    resultado = insertFilminhos(
        nome=data.get("titulo", ""),
        produtora_principal=id_produtora_principal,
        produtoras=produtoras_ids,
        categorias=categorias_ids,
        atores=atores_ids,
        diretores=diretores_ids,
        linguagens=linguagens_ids,
        paises=paises_ids,
        orcamento=orcamento,
        duracao=data.get("duracao", ""),
        sinopse=data.get("sinopse", ""),
        ano=data.get("ano", None),
        poster=data.get("imagem", None),
        banner=data.get("banner", None),
        flag=0
    )

    handler._send_json(resultado, 201)


from infra.database import *

TABELAS = ["ator", "diretor"]

def loadActorsDirector(tabela):
    if tabela not in TABELAS:
        raise ValueError("Tabela inválida!")

    db = get_connection()
    cursor = db.cursor()

    cursor.execute(f"SELECT * FROM {tabela}")
    results = cursor.fetchall()

    cursor.close()
    db.close()

    return [
        {
            "id": item[0],
            "nome": item[1],
            "sobrenome": item[2],
            "id_genero": item[3]
        }
        for item in results
    ]


def getActorDirectorByName(tabela, nome_completo):
    if tabela not in TABELAS:
        raise ValueError("Tabela inválida!")

    partes = nome_completo.strip().split(" ", 1)
    nome = partes[0]
    sobrenome = partes[1] if len(partes) > 1 else ""

    db = get_connection()
    cursor = db.cursor()

    cursor.execute(
        f"SELECT id_{tabela} FROM {tabela} WHERE nome = %s AND sobrenome = %s",
        (nome, sobrenome)
    )
    result = cursor.fetchone()

    cursor.close()
    db.close()

    return result[0] if result else None


def insertActorDirectorReturnId(tabela, nome_completo, genero=3):
    if tabela not in TABELAS:
        raise ValueError("Tabela inválida!")

    partes = nome_completo.strip().split(" ", 1)
    nome = partes[0]
    sobrenome = partes[1] if len(partes) > 1 else ""

    db = get_connection()
    cursor = db.cursor()

    cursor.execute(
        f"INSERT INTO {tabela} (nome, sobrenome, id_genero) VALUES (%s, %s, %s)",
        (nome, sobrenome, genero)
    )

    novo_id = cursor.lastrowid

    db.commit()
    cursor.close()
    db.close()

    return novo_id


def insertActorDirector(tabela, nome, sobrenome, genero=3):
    if tabela not in TABELAS:
        raise ValueError("Tabela inválida!")

    db = get_connection()
    cursor = db.cursor()

    cursor.execute(
        f"INSERT INTO {tabela} (nome, sobrenome, id_genero) VALUES (%s, %s, %s)",
        (nome, sobrenome, genero)
    )

    db.commit()
    cursor.close()
    db.close()

    return loadActorsDirector(tabela)


def deleteActorsDirector(tabela, id_item):
    if tabela not in TABELAS:
        raise ValueError("Tabela inválida!")

    db = get_connection()
    cursor = db.cursor()

    cursor.execute(f"SELECT * FROM {tabela} WHERE id_{tabela} = %s", (id_item,))
    if not cursor.fetchone():
        cursor.close()
        db.close()
        return {"error": f"{tabela} não encontrado"}

    if tabela == "ator":
        cursor.execute(
            "SELECT * FROM filme_ator WHERE id_ator = %s",
            (id_item,)
        )
    else:
        cursor.execute(
            "SELECT * FROM filme_diretor WHERE id_diretor = %s",
            (id_item,)
        )

    if cursor.fetchone():
        cursor.close()
        db.close()
        return {
            "error": f"Não é possível deletar {tabela}. Está vinculado a um ou mais filmes."
        }

    cursor.execute(
        f"DELETE FROM {tabela} WHERE id_{tabela} = %s",
        (id_item,)
    )

    db.commit()
    cursor.close()
    db.close()

    return loadActorsDirector(tabela)

def put_AprovaFilme(handler):
    header_auth = handler.headers.get("Authorization", "")

    if not header_auth.startswith("Bearer "):
        handler._send_json({"error": "Token não informado"}, 401)
        return

    token = header_auth.split(" ")[1]
    payload = verify_jwt(token)

    if not payload or payload.get("role") != "admin":
        handler._send_json({"error": "Apenas admin pode aprovar filmes"}, 403)
        return

    params = parse_qs(urlparse(handler.path).query)
    filme_id = params.get("id", [None])[0]

    if not filme_id:
        handler._send_json({"error": "ID do filme não informado"}, 400)
        return

    sucesso = aprovarFilmini(filme_id)

    if sucesso:
        handler._send_json({"message": "Filme aprovado com sucesso"})
    else:
        handler._send_json({"error": "Filme não encontrado ou já aprovado"}, 404)

def patch_Filme(handler):
    header_auth = handler.headers.get("Authorization", "")

    if not header_auth.startswith("Bearer "):
        handler._send_json({"error": "Token não informado"}, 401)
        return

    token = header_auth.split(" ")[1]
    payload = verify_jwt(token)

    if not payload or payload.get("role") != "admin":
        handler._send_json({"error": "Apenas admin pode editar filmes"}, 403)
        return

    params = parse_qs(urlparse(handler.path).query)
    id_filme = params.get("id", [None])[0]

    try:
        id_filme = int(id_filme)
    except:
        handler._send_json({"error": "ID inválido"}, 400)
        return

    filme = getFilmeById(id_filme)

    if not filme:
        handler._send_json({"error": "Filme não encontrado"}, 404)
        return

    if filme["flag"] == 0:
        handler._send_json({"error": "Filme ainda não aprovado"}, 403)
        return

    content_length = int(handler.headers.get('Content-Length', 0))
    body = handler.rfile.read(content_length).decode('utf-8')

    try:
        data = json.loads(body)
    except:
        handler._send_json({"error": "JSON inválido"}, 400)
        return

    campos_para_atualizar = {}

    if "titulo" in data:
        campos_para_atualizar["titulo"] = data["titulo"]

    if "id_produtora_principal" in data:
        campos_para_atualizar["id_produtora_principal"] = data["id_produtora_principal"]

    if "orcamento" in data:
        campos_para_atualizar["orcamento"] = int(
            data["orcamento"]
            .replace("R$", "")
            .replace(".", "")
            .replace(",", "")
            .strip()
        )

    if "duracao" in data:
        campos_para_atualizar["duracao"] = data["duracao"]

    if "sinopse" in data:
        campos_para_atualizar["sinopse"] = data["sinopse"]

    if "ano" in data:
        campos_para_atualizar["ano"] = int(data["ano"])

    if "imagem" in data:
        campos_para_atualizar["poster"] = data["imagem"]

    if campos_para_atualizar:
        patchCamposFilme(id_filme, campos_para_atualizar)

    if "atores" in data:
        patchRelacionamento(id_filme, "filme_ator", "id_ator", data["atores"])

    if "diretores" in data:
        patchRelacionamento(id_filme, "filme_diretor", "id_diretor", data["diretores"])

    if "categorias" in data:
        patchRelacionamento(id_filme, "filme_categoria", "id_categoria", data["categorias"])

    if "linguagens" in data:
        patchRelacionamento(id_filme, "filme_linguagem", "id_linguagem", data["linguagens"])

    if "paises" in data:
        patchRelacionamento(id_filme, "filme_pais", "id_pais", data["paises"])

    if "produtoras" in data:
        patchRelacionamento(id_filme, "filme_produtora", "id_produtora", data["produtoras"])

    handler._send_json({"message": "Filme editado com sucesso"})
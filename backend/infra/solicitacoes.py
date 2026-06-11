import mysql.connector
from infra.database import get_connection


# ─── SQL para criar a tabela caso não exista ───────────────────────────────────
CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS solicitacao (
    id_solicitacao INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario     INT          NOT NULL,
    tipo           ENUM('adicao','edicao') NOT NULL,
    id_filme       INT          DEFAULT NULL,   -- NULL quando for adição
    dados          JSON         NOT NULL,       -- snapshot dos campos enviados
    status         ENUM('pendente','aprovada','reprovada') NOT NULL DEFAULT 'pendente',
    mensagem_admin VARCHAR(500) DEFAULT NULL,   -- feedback do admin
    criado_em      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
)
"""


def garantir_tabela():
    """Cria a tabela solicitacao se ainda não existir."""
    db = get_connection()
    cursor = db.cursor()
    cursor.execute(CREATE_TABLE_SQL)
    db.commit()
    cursor.close()
    db.close()


# ─── Criar solicitação ────────────────────────────────────────────────────────
def criarSolicitacao(id_usuario, tipo, dados, id_filme=None):
    """
    tipo: 'adicao' | 'edicao'
    dados: dict com os campos do filme
    id_filme: obrigatório para 'edicao'
    """
    import json
    garantir_tabela()

    db = get_connection()
    cursor = db.cursor()

    cursor.execute(
        """
        INSERT INTO solicitacao (id_usuario, tipo, id_filme, dados)
        VALUES (%s, %s, %s, %s)
        """,
        (id_usuario, tipo, id_filme, json.dumps(dados, ensure_ascii=False))
    )

    novo_id = cursor.lastrowid
    db.commit()
    cursor.close()
    db.close()

    return {"message": "Solicitação enviada com sucesso", "id": novo_id}


# ─── Listar pendentes (admin) ─────────────────────────────────────────────────
def listarSolicitacoesPendentes():
    import json, datetime
    garantir_tabela()

    db = get_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT
            s.id_solicitacao,
            s.tipo,
            s.id_filme,
            s.dados,
            s.status,
            s.mensagem_admin,
            s.criado_em,
            u.nome,
            u.apelido,
            u.email
        FROM solicitacao s
        JOIN usuario u ON u.id_usuario = s.id_usuario
        WHERE s.status = 'pendente'
        ORDER BY s.criado_em DESC
        """
    )

    rows = cursor.fetchall()
    cursor.close()
    db.close()

    for row in rows:
        if isinstance(row.get("dados"), str):
            row["dados"] = json.loads(row["dados"])
        if isinstance(row.get("criado_em"), (datetime.date, datetime.datetime)):
            row["criado_em"] = str(row["criado_em"])

    return rows


# ─── Listar todas as solicitações de um usuário ───────────────────────────────
def listarSolicitacoesUsuario(id_usuario):
    import json, datetime
    garantir_tabela()

    db = get_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT
            id_solicitacao,
            tipo,
            id_filme,
            dados,
            status,
            mensagem_admin,
            criado_em,
            atualizado_em
        FROM solicitacao
        WHERE id_usuario = %s
        ORDER BY criado_em DESC
        """,
        (id_usuario,)
    )

    rows = cursor.fetchall()
    cursor.close()
    db.close()

    for row in rows:
        if isinstance(row.get("dados"), str):
            row["dados"] = json.loads(row["dados"])
        for campo in ("criado_em", "atualizado_em"):
            if isinstance(row.get(campo), (datetime.date, datetime.datetime)):
                row[campo] = str(row[campo])

    return rows


# ─── Contar pendentes (para o sininho) ───────────────────────────────────────
def contarPendentes():
    garantir_tabela()

    db = get_connection()
    cursor = db.cursor()

    cursor.execute("SELECT COUNT(*) FROM solicitacao WHERE status = 'pendente'")
    total = cursor.fetchone()[0]

    cursor.close()
    db.close()

    return total


# ─── Aprovar / reprovar ───────────────────────────────────────────────────────
def responderSolicitacao(id_solicitacao, novo_status, mensagem_admin=None):
    """
    novo_status: 'aprovada' | 'reprovada'
    Retorna o dict da solicitação atualizada, ou None se não encontrar.
    """
    import json
    garantir_tabela()

    db = get_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM solicitacao WHERE id_solicitacao = %s AND status = 'pendente'",
        (id_solicitacao,)
    )
    sol = cursor.fetchone()

    if not sol:
        cursor.close()
        db.close()
        return None

    cursor.execute(
        """
        UPDATE solicitacao
        SET status = %s, mensagem_admin = %s
        WHERE id_solicitacao = %s
        """,
        (novo_status, mensagem_admin, id_solicitacao)
    )
    db.commit()

    # Se aprovada → aplica as mudanças automaticamente
    if novo_status == "aprovada":
        dados = sol["dados"] if isinstance(sol["dados"], dict) else json.loads(sol["dados"])
        tipo  = sol["tipo"]

        if tipo == "edicao" and sol.get("id_filme"):
            _aplicarEdicao(cursor, db, sol["id_filme"], dados)
        elif tipo == "adicao":
            _aplicarAdicao(dados)

    cursor.close()
    db.close()

    return {"message": f"Solicitação {novo_status} com sucesso"}


# ─── Helpers internos ─────────────────────────────────────────────────────────
def _aplicarEdicao(cursor, db, id_filme, dados):
    """Chama o patch normal de filme com os dados da solicitação aprovada."""
    from infra.database import patchCamposFilme, patchRelacionamento, getFilmeById
    from api.handlers.filme import (
        getActorDirectorByName, insertActorDirectorReturnId
    )
    from infra.genresProducers import insertGenresProducer, getProducerByName

    campos = {}

    if "titulo"   in dados: campos["titulo"]   = dados["titulo"]
    if "sinopse"  in dados: campos["sinopse"]  = dados["sinopse"]
    if "duracao"  in dados: campos["duracao"]  = dados["duracao"]
    if "ano"      in dados: campos["ano"]      = int(dados["ano"])
    if "imagem"   in dados: campos["poster"]   = dados["imagem"]
    if "banner"   in dados: campos["banner"]   = dados["banner"]

    if "orcamento" in dados:
        try:
            campos["orcamento"] = int(
                str(dados["orcamento"])
                .replace("R$","").replace(".","").replace(",","").strip()
            )
        except:
            pass

    if campos:
        patchCamposFilme(id_filme, campos)

    diretor_nome = dados.get("diretor_nome", "").strip()
    if diretor_nome:
        id_dir = getActorDirectorByName("diretor", diretor_nome) or \
                 insertActorDirectorReturnId("diretor", diretor_nome)
        patchRelacionamento(id_filme, "filme_diretor", "id_diretor", [id_dir])

    ator_nome = dados.get("ator_nome", "").strip()
    if ator_nome:
        id_ator = getActorDirectorByName("ator", ator_nome) or \
                  insertActorDirectorReturnId("ator", ator_nome)
        patchRelacionamento(id_filme, "filme_ator", "id_ator", [id_ator])

    produtora_nome = dados.get("produtora_nome", "").strip()
    if produtora_nome:
        id_prod = getProducerByName(produtora_nome)
        if id_prod is None:
            insertGenresProducer("produtora", produtora_nome)
            id_prod = getProducerByName(produtora_nome)
        if id_prod:
            patchCamposFilme(id_filme, {"id_produtora_principal": id_prod})
            patchRelacionamento(id_filme, "filme_produtora", "id_produtora", [id_prod])

    if "categoria_id"   in dados:
        patchRelacionamento(id_filme, "filme_categoria", "id_categoria",  dados["categoria_id"])
    if "linguagem_id"   in dados:
        patchRelacionamento(id_filme, "filme_linguagem", "id_linguagem",  dados["linguagem_id"])
    if "pais_origem_id" in dados:
        patchRelacionamento(id_filme, "filme_pais",      "id_pais",       dados["pais_origem_id"])


def _aplicarAdicao(dados):
    """Chama o insert normal de filme com os dados da solicitação aprovada."""
    from infra.database import insertFilminhos
    from api.handlers.filme import (
        getActorDirectorByName, insertActorDirectorReturnId
    )
    from infra.genresProducers import insertGenresProducer, getProducerByName

    diretores_ids = []
    diretor_nome = dados.get("diretor_nome", "").strip()
    if diretor_nome:
        id_dir = getActorDirectorByName("diretor", diretor_nome) or \
                 insertActorDirectorReturnId("diretor", diretor_nome)
        diretores_ids = [id_dir]

    atores_ids = []
    ator_nome = dados.get("ator_nome", "").strip()
    if ator_nome:
        id_ator = getActorDirectorByName("ator", ator_nome) or \
                  insertActorDirectorReturnId("ator", ator_nome)
        atores_ids = [id_ator]

    produtoras_ids = []
    id_produtora_principal = None
    produtora_nome = dados.get("produtora_nome", "").strip()
    if produtora_nome:
        id_prod = getProducerByName(produtora_nome)
        if id_prod is None:
            insertGenresProducer("produtora", produtora_nome)
            id_prod = getProducerByName(produtora_nome)
        if id_prod:
            produtoras_ids = [id_prod]
            id_produtora_principal = id_prod

    try:
        orcamento = int(
            str(dados.get("orcamento", 0))
            .replace("R$","").replace(".","").replace(",","").strip()
        )
    except:
        orcamento = 0

    insertFilminhos(
        nome=dados.get("titulo", ""),
        produtora_principal=id_produtora_principal,
        produtoras=produtoras_ids,
        categorias=dados.get("categoria_id", []),
        atores=atores_ids,
        diretores=diretores_ids,
        linguagens=dados.get("linguagem_id", []),
        paises=dados.get("pais_origem_id", []),
        orcamento=orcamento,
        duracao=dados.get("duracao", ""),
        sinopse=dados.get("sinopse", ""),
        ano=dados.get("ano", None),
        poster=dados.get("imagem", None),
        banner=dados.get("banner", None),
        flag=1  # aprovado direto
    )
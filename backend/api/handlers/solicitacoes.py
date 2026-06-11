import json
from urllib.parse import parse_qs, urlparse
from api.jwt import verify_jwt
from infra.solicitacoes import (
    criarSolicitacao,
    listarSolicitacoesPendentes,
    listarSolicitacoesUsuario,
    contarPendentes,
    responderSolicitacao,
)


def _get_payload(handler):
    """Extrai e valida o JWT, retorna payload ou None."""
    header_auth = handler.headers.get("Authorization", "")
    if not header_auth.startswith("Bearer "):
        handler._send_json({"error": "Token não informado"}, 401)
        return None
    token = header_auth.split(" ")[1]
    payload = verify_jwt(token)
    if not payload:
        handler._send_json({"error": "Token inválido ou expirado"}, 401)
        return None
    return payload


# ─── GET /solicitacoes/pendentes  (só admin) ──────────────────────────────────
def get_SolicitacoesPendentes(handler):
    payload = _get_payload(handler)
    if not payload:
        return
    if payload.get("role") != "admin":
        handler._send_json({"error": "Apenas administradores podem ver solicitações"}, 403)
        return
    handler._send_json(listarSolicitacoesPendentes())


# ─── GET /solicitacoes/minhas  (usuário vê as próprias) ───────────────────────
def get_MinhasSolicitacoes(handler):
    payload = _get_payload(handler)
    if not payload:
        return
    id_usuario = payload.get("id")
    handler._send_json(listarSolicitacoesUsuario(id_usuario))


# ─── GET /solicitacoes/contador  (sininho — só admin) ─────────────────────────
def get_ContadorPendentes(handler):
    payload = _get_payload(handler)
    if not payload:
        return
    if payload.get("role") != "admin":
        handler._send_json({"error": "Acesso negado"}, 403)
        return
    handler._send_json({"total": contarPendentes()})


# ─── POST /solicitacoes  (usuário envia pedido) ───────────────────────────────
def post_Solicitacao(handler):
    payload = _get_payload(handler)
    if not payload:
        return

    content_length = int(handler.headers.get("Content-Length", 0))
    body = handler.rfile.read(content_length).decode("utf-8")

    try:
        data = json.loads(body)
    except:
        handler._send_json({"error": "JSON inválido"}, 400)
        return

    tipo = data.get("tipo")  # 'adicao' ou 'edicao'
    if tipo not in ("adicao", "edicao"):
        handler._send_json({"error": "tipo deve ser 'adicao' ou 'edicao'"}, 400)
        return

    id_filme = data.get("id_filme")  # obrigatório para edicao
    if tipo == "edicao" and not id_filme:
        handler._send_json({"error": "id_filme é obrigatório para solicitações de edição"}, 400)
        return

    dados = data.get("dados", {})
    id_usuario = payload.get("id")

    resultado = criarSolicitacao(id_usuario, tipo, dados, id_filme)
    handler._send_json(resultado, 201)


# ─── PATCH /solicitacoes  (admin aprova/reprova) ──────────────────────────────
def patch_Solicitacao(handler):
    payload = _get_payload(handler)
    if not payload:
        return

    if payload.get("role") != "admin":
        handler._send_json({"error": "Apenas administradores podem responder solicitações"}, 403)
        return

    params = parse_qs(urlparse(handler.path).query)
    id_sol = params.get("id", [None])[0]

    if not id_sol:
        handler._send_json({"error": "ID da solicitação não informado"}, 400)
        return

    try:
        id_sol = int(id_sol)
    except:
        handler._send_json({"error": "ID inválido"}, 400)
        return

    content_length = int(handler.headers.get("Content-Length", 0))
    body = handler.rfile.read(content_length).decode("utf-8")

    try:
        data = json.loads(body)
    except:
        handler._send_json({"error": "JSON inválido"}, 400)
        return

    novo_status = data.get("status")  # 'aprovada' | 'reprovada'
    if novo_status not in ("aprovada", "reprovada"):
        handler._send_json({"error": "status deve ser 'aprovada' ou 'reprovada'"}, 400)
        return

    mensagem = data.get("mensagem", None)

    resultado = responderSolicitacao(id_sol, novo_status, mensagem)

    if resultado is None:
        handler._send_json({"error": "Solicitação não encontrada ou já respondida"}, 404)
    else:
        handler._send_json(resultado)
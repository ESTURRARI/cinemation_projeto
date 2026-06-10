import os
import json
import base64
import uuid

def post_Upload(handler):

    content_length = int(
        handler.headers.get("Content-Length", 0)
    )

    body = handler.rfile.read(
        content_length
    ).decode("utf-8")

    try:

        data = json.loads(body)

    except:

        handler._send_json(
            {"error": "JSON inválido"},
            400
        )

        return

    nome_arquivo = data.get("nome")
    imagem_base64 = data.get("imagem")

    if not nome_arquivo or not imagem_base64:

        handler._send_json(
            {"error": "Imagem não enviada"},
            400
        )

        return

    extensao = nome_arquivo.split(".")[-1]

    novo_nome = (
        str(uuid.uuid4())
        + "."
        + extensao
    )

    caminho = os.path.join(
        "uploads",
        novo_nome
    )

    with open(caminho, "wb") as f:

        f.write(
            base64.b64decode(
                imagem_base64
            )
        )

    handler._send_json({

        "arquivo": novo_nome,
        "url":
        f"http://localhost:8000/uploads/{novo_nome}"

    })
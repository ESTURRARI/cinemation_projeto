# CINEMATION

Aplicação web de catálogo de filmes com autenticação de usuários, favoritos, notificações e painel de administração.

---

## Estrutura do Projeto

```
/
├── frontend/     # React (Vite) — interface do usuário
├── backend/      # Python (http.server) — API REST
└── database/     # Script SQL — banco de dados MySQL
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+) e npm
- [Python](https://www.python.org/) (v3.10+)
- [MySQL](https://www.mysql.com/) (v8.0+)

---

## 1. Banco de Dados

### Configurar o MySQL

1. Acesse o MySQL como root:
   ```bash
   mysql -u root -p
   ```

2. Execute o script de criação:
   ```bash
   mysql -u root -p < database/filme_Mari-DDL-DML.sql
   ```

   Isso irá criar o banco `filme_mari` com todas as tabelas e dados iniciais.

> **Credenciais esperadas pelo backend:** `root` / `root` no host `localhost`. Caso as suas sejam diferentes, edite o arquivo `backend/infra/database.py`:
> ```python
> host="localhost",
> user="root",
> password="root",
> database="filme_mari"
> ```

---

## 2. Backend

### Instalar dependências

```bash
cd backend
python -m venv env
source env/bin/activate        # Linux/Mac
env\Scripts\activate           # Windows
pip install -r requirements.txt
```

### Iniciar o servidor

```bash
python server.py
```

O servidor estará disponível em **http://localhost:8000**.

---

## 3. Frontend

### Instalar dependências

```bash
cd frontend
npm install
```

### Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O frontend estará disponível em **http://localhost:5173** (ou na porta indicada pelo Vite).

---

## Rodando tudo junto

Abra **dois terminais** e execute:

**Terminal 1 — Backend:**
```bash
cd backend
python server.py
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Acesse **http://localhost:5173** no navegador.

---
## Login de usuário admin
email: admin@example.com
senha: admin

##usuario comum você pode utilizar
email: usuario@mail.com
senha: 123456

ou cadastrar um novo

## Páginas da aplicação

| Rota | Descrição |
|---|---|
| `/` ou `/login` | Tela de login |
| `/cadastro` | Cadastro de novo usuário |
| `/home` | Página inicial com filmes em destaque |
| `/filmes` | Catálogo completo de filmes |
| `/favoritos` | Filmes favoritos do usuário |
| `/perfil` | Perfil do usuário |
| `/detalhes/:id` | Detalhes de um filme |
| `/editar/:id` | Editar informações de um filme |
| `/adicionar` | Adicionar novo filme |
| `/notificacoes` | Notificações e solicitações |

---

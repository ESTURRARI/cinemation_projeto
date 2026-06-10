import './cadastro.css'

import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Cadastro(){

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleCadastro() {

    setErro('')

    if (!email || !username || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos.')
      return
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }

    setCarregando(true)

    try {

      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: username,
          sobrenome: '',
          apelido: username,
          email,
          senha,
          data_nascimento: null,
          imagem: null
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setErro(data.error || 'Erro ao cadastrar usuário.')
        return
      }

      alert('Cadastro realizado com sucesso!')
      navigate('/login')

    } catch(error) {
      setErro('Não foi possível conectar ao servidor. Verifique se o backend está rodando.')
    } finally {
      setCarregando(false)
    }
  }

  return(

    <main className="cadastro">

      <div className="bola-top"></div>
      <div className="bola-bottom"></div>

      <header className="header-cadastro">
        <h1>CINEMATION</h1>
      </header>

      <section className="conteudo-cadastro">

        <div className="card-cadastro">

          <h2>Cadastro</h2>

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />

          {erro && <p className="erro-msg">{erro}</p>}

          <button
            className="btn-cadastro"
            onClick={handleCadastro}
            disabled={carregando}
          >
            {carregando ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          <p className="link-login">
            Já possui conta?{" "}
            <Link to="/login">Faça login</Link>
          </p>

        </div>

      </section>

    </main>
  )
}

export default Cadastro
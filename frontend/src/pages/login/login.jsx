import './login.css'

import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login(){

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleLogin() {

    setErro('')
    setCarregando(true)

    try {

      const response = await fetch('http://localhost:8000/send_loginho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email, password: senha })
      })

      const data = await response.json()

      if (!response.ok) {
        setErro(data.error || 'Email ou senha inválidos.')
        return
      }

      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)

      navigate('/perfil')

    } catch(error) {
      setErro('Não foi possível conectar ao servidor. Verifique se o backend está rodando.')
    } finally {
      setCarregando(false)
    }
  }

  return(

    <main className="login">

      <div className="bola-top"></div>
      <div className="bola-bottom"></div>

      <header className="header-login">
        <h1>CINEMATION</h1>
      </header>

      <section className="conteudo-login">

        <div className="card-login">

          <h2>Login</h2>

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {erro && <p className="erro-msg">{erro}</p>}

          <button
            className="btn-login"
            onClick={handleLogin}
            disabled={carregando}
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>

          <p className="link-cadastro">
            Não possui conta?{" "}
            <Link to="/cadastro">Cadastre-se</Link>
          </p>

        </div>

      </section>

    </main>
  )
}

export default Login
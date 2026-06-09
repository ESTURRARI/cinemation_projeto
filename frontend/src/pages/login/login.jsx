import './login.css'

import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login(){

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function handleLogin() {

    try {

      const response = await fetch(
        'http://localhost:8000/send_loginho',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },

          body: new URLSearchParams({
            email,
            senha
          })
        }
      )

      const data = await response.json()

      console.log(data)

    } catch(error) {

      console.error(error)

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

          <button
            className="btn-login"
            onClick={handleLogin}
          >

            Entrar

          </button>

          <p className="link-cadastro">

            Não possui conta?{" "}

            <Link to="/cadastro">

              Cadastre-se

            </Link>

          </p>

        </div>

      </section>

    </main>

  )
}

export default Login
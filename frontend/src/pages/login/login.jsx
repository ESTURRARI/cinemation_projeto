import './login.css'

import { Link } from 'react-router-dom'

function Login(){

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
          />

          <input
            type="password"
            placeholder="Senha"
          />

          <button className="btn-login">

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
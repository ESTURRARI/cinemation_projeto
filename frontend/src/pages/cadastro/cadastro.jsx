import './cadastro.css'

import { Link } from 'react-router-dom'

function Cadastro(){

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
          />

          <input
            type="text"
            placeholder="Username"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <input
            type="password"
            placeholder="Confirm Password"
          />

          <button className="btn-cadastro">

            Cadastrar

          </button>

          <p className="link-login">

            Já possui conta?{" "}

            <Link to="/login">

              Faça login

            </Link>

          </p>

        </div>

      </section>

    </main>

  )
}

export default Cadastro
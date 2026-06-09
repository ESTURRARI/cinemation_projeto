import './cadastro.css'

import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Cadastro(){

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  async function handleCadastro() {

    if (
      !email ||
      !username ||
      !senha ||
      !confirmarSenha
    ) {

      alert('Preencha todos os campos.')

      return
    }

    if (senha !== confirmarSenha) {

      alert('As senhas não coincidem.')

      return
    }

    try {

      const response = await fetch(
        'http://localhost:8000/register',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            nome: username,
            sobrenome: '',
            apelido: username,
            email,
            senha,
            data_nascimento: null,
            imagem: null
          })
        }
      )

      const data = await response.json()

      console.log(data)

      if (!response.ok) {

        alert(
          data.error ||
          'Erro ao cadastrar usuário.'
        )

        return
      }

      alert('Cadastro realizado com sucesso!')

      navigate('/login')

    } catch(error) {

      console.error(error)

      alert(
        'Erro ao conectar com o servidor.'
      )

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
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={senha}
            onChange={(e) =>
              setSenha(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmarSenha}
            onChange={(e) =>
              setConfirmarSenha(e.target.value)
            }
          />

          <button
            className="btn-cadastro"
            onClick={handleCadastro}
          >

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
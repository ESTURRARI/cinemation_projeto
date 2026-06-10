import './perfil.css'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FaCamera } from "react-icons/fa"
import { FaPen } from "react-icons/fa"

function Perfil() {

  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [apelido, setApelido] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [genero, setGenero] = useState('')
  const [foto, setFoto] = useState(null)

  useEffect(() => {

    carregarPerfil()

  }, [])

  async function carregarPerfil() {

    const token = localStorage.getItem(
      'access_token'
    )

    try {

      const response = await fetch(
        'http://localhost:8000/me',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      setNome(data.nome || '')
      setSobrenome(data.sobrenome || '')
      setApelido(data.apelido || '')
      setDataNascimento(
        data.data_nascimento || ''
      )
      setGenero(
        data.id_genero?.toString() || ''
      )

    } catch(error) {

      console.error(error)

    }

  }

  async function uploadImagem(arquivo) {

    if (!arquivo) return null

    const base64 = await new Promise((resolve) => {

      const reader = new FileReader()

      reader.onload = () => {

        const resultado = reader.result
        const somenteBase64 = resultado.split(',')[1]

        resolve(somenteBase64)

      }

      reader.readAsDataURL(arquivo)

    })

    const response = await fetch(
      'http://localhost:8000/upload',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          nome: arquivo.name,
          imagem: base64
        })
      }
    )

    const data = await response.json()

    return data.arquivo
  }

  async function salvarPerfil() {

    const token = localStorage.getItem(
      'access_token'
    )

    try {

      let nomeImagem = null

      if (foto) {

        nomeImagem = await uploadImagem(
          foto
        )
      }

      const response = await fetch(
        'http://localhost:8000/edit/me',
        {
          method: 'PATCH',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            nome,
            sobrenome,
            apelido,
            data_nascimento: dataNascimento,
            imagem: nomeImagem
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {

        alert(
          data.error ||
          'Erro ao atualizar perfil.'
        )

        return
      }

      alert(
        'Perfil atualizado com sucesso!'
      )

      window.location.href = '/home'

    } catch(error) {

      console.error(error)

      alert(
        'Erro ao atualizar perfil.'
      )

    }

  }

  function logout() {

    localStorage.clear()

    window.location.href = '/login'

  }

  return (

    <main className="perfil">

      <section className="perfil-top"></section>

      <section className="conteudo-perfil">

        <div className="foto-area">

          <label
            htmlFor="fotoPerfil"
            className="foto-preview"
          >

            {foto ? (

              <img
                src={URL.createObjectURL(foto)}
                alt="perfil"
              />

            ) : (

              <FaCamera />

            )}

          </label>

          <input
            id="fotoPerfil"
            type="file"
            hidden
            onChange={(e) =>
              setFoto(e.target.files[0])
            }
          />

          <h3>Foto de perfil</h3>

        </div>

        <div className="formulario-perfil">

          <div className="grupo-perfil">

            <label>Nome</label>

            <div className="input-perfil">

              <input
                type="text"
                value={nome}
                onChange={(e) =>
                  setNome(e.target.value)
                }
              />

              <FaPen className="icone-lapis" />

            </div>

          </div>

          <div className="grupo-perfil">

            <label>Sobrenome</label>

            <div className="input-perfil">

              <input
                type="text"
                value={sobrenome}
                onChange={(e) =>
                  setSobrenome(e.target.value)
                }
              />

              <FaPen className="icone-lapis" />

            </div>

          </div>

          <div className="grupo-perfil">

            <label>Apelido</label>

            <div className="input-perfil">

              <input
                type="text"
                value={apelido}
                onChange={(e) =>
                  setApelido(e.target.value)
                }
              />

              <FaPen className="icone-lapis" />

            </div>

          </div>

          <div className="grupo-perfil">

            <label>Data de nascimento</label>

            <div className="input-perfil">

              <input
                type="date"
                value={dataNascimento}
                onChange={(e) =>
                  setDataNascimento(
                    e.target.value
                  )
                }
              />

              <FaPen className="icone-lapis" />

            </div>

          </div>

          <div className="grupo-perfil">

            <label>Gênero</label>

            <div className="input-perfil">

              <select
                value={genero}
                onChange={(e) =>
                  setGenero(e.target.value)
                }
              >

                <option value="">
                  Selecione
                </option>

                <option value="1">
                  Masculino
                </option>

                <option value="2">
                  Feminino
                </option>

                <option value="3">
                  Não-binário
                </option>

              </select>

            </div>

          </div>

          <button
            className="btn-salvar"
            onClick={salvarPerfil}
          >

            Salvar Perfil

          </button>

          <button
            className="btn-logout"
            onClick={logout}
          >

            Sair

          </button>

        </div>

      </section>

      <section className="perfil-bottom"></section>

    </main>

  )
}

export default Perfil
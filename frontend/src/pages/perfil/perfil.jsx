import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Perfil() {

  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [apelido, setApelido] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')

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

      console.log(data)

      setNome(data.nome || '')
      setSobrenome(data.sobrenome || '')
      setApelido(data.apelido || '')
      setDataNascimento(
        data.data_nascimento || ''
      )

    } catch(error) {

      console.error(error)

    }

  }

  async function salvarPerfil() {

    const token = localStorage.getItem(
      'access_token'
    )

    try {

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
            data_nascimento: dataNascimento
          })
        }
      )

      const data = await response.json()

      console.log(data)

      alert(
        'Perfil atualizado com sucesso!'
      )

      navigate('/home')

    } catch(error) {

      console.error(error)

      alert(
        'Erro ao atualizar perfil.'
      )

    }

  }

  return (

    <main
      style={{
        maxWidth: '600px',
        margin: '40px auto'
      }}
    >

      <h1>Complete seu Perfil</h1>

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) =>
          setNome(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Sobrenome"
        value={sobrenome}
        onChange={(e) =>
          setSobrenome(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Apelido"
        value={apelido}
        onChange={(e) =>
          setApelido(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="date"
        value={dataNascimento}
        onChange={(e) =>
          setDataNascimento(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        onClick={salvarPerfil}
      >
        Salvar Perfil
      </button>

    </main>

  )
}

export default Perfil
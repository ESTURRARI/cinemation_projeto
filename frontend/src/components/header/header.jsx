import './header.css'

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { FaUserCircle } from "react-icons/fa"
import { IoNotificationsOutline } from "react-icons/io5"

function Header() {

  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    carregarUsuario()
  }, [])

  async function carregarUsuario() {

    const token = localStorage.getItem('access_token')
    if (!token) return

    let tentativas = 0
    const maxTentativas = 8

    const tentar = async () => {
      try {
        const response = await fetch('http://localhost:8000/me', {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (!response.ok) return

        const data = await response.json()
        setUsuario(data)

      } catch (error) {
        tentativas++
        if (tentativas < maxTentativas) {
          console.warn(`Header: backend ainda não disponível, tentando novamente... (${tentativas}/${maxTentativas})`)
          setTimeout(tentar, 2000)
        } else {
          console.error('Header: não foi possível carregar usuário após várias tentativas.')
        }
      }
    }

    tentar()
  }

  return (

    <header className="header">

      <div className="header-left">

        {usuario?.imagem ? (
          <img
            src={`http://localhost:8000/uploads/${usuario.imagem}`}
            alt="perfil"
            className="profile-image"
          />
        ) : (
          <FaUserCircle className="profile-icon" />
        )}

        {usuario ? (
          <Link to="/perfil" className="login-link">{usuario.nome}</Link>
        ) : (
          <Link to="/login" className="login-link">Faça Login</Link>
        )}

      </div>

      <div className="header-center">
        <h1>CINEMATION</h1>
      </div>

      <nav className="header-right">
        <Link to="/home">Home</Link>
        <Link to="/filmes">Filmes</Link>
        <Link to="/favoritos">Favoritos</Link>
        <IoNotificationsOutline className="notification-icon" />
      </nav>

    </header>
  )
}

export default Header
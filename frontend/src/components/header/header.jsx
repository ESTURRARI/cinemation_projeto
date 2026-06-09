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

    const token = localStorage.getItem(
      'access_token'
    )

    if (!token) {
      return
    }

    try {

      const response = await fetch(
        'http://localhost:8000/me',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (!response.ok) {
        return
      }

      const data = await response.json()

      setUsuario(data)

    } catch(error) {

      console.error(error)

    }

  }

  return (

    <header className="header">

      <div className="header-left">

        <FaUserCircle className="profile-icon" />

        {usuario ? (

          <Link
            to="/perfil"
            className="login-link"
          >
            {usuario.nome}
          </Link>

        ) : (

          <Link
            to="/login"
            className="login-link"
          >
            Faça Login
          </Link>

        )}

      </div>

      <div className="header-center">

        <h1>CINEMATION</h1>

      </div>

      <nav className="header-right">

        <Link to="/home">
          Home
        </Link>

        <Link to="/filmes">
          Filmes
        </Link>

        <Link to="/favoritos">
          Favoritos
        </Link>

        <IoNotificationsOutline className="notification-icon" />

      </nav>

    </header>

  )
}

export default Header
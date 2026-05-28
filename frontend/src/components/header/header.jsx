import './header.css'

import { Link } from 'react-router-dom'

import { FaUserCircle } from "react-icons/fa"

import { IoNotificationsOutline } from "react-icons/io5"

function Header() {

  return (

    <header className="header">

      <div className="header-left">

        <FaUserCircle className="profile-icon" />

        <Link to="/login" className="login-link">
          Faça Login
        </Link>

      </div>

      <div className="header-center">

        <h1>CINEMATION</h1>

      </div>

      <nav className="header-right">

        <Link to="/">Home</Link>

        <Link to="/filmes">Filmes</Link>

        <Link to="/favoritos">Favoritos</Link>

        <IoNotificationsOutline className="notification-icon" />

      </nav>

    </header>

  )
}

export default Header
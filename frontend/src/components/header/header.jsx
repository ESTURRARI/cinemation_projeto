import './header.css'

import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'

import { FaUserCircle } from "react-icons/fa"
import { IoNotificationsOutline } from "react-icons/io5"

function Header() {

  const [usuario, setUsuario] = useState(null)
  const [pendentes, setPendentes] = useState(0)
  const navigate = useNavigate()

  // Decodifica o role do JWT sem biblioteca externa
  function getRoleFromToken(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
      return payload.role
    } catch {
      return null
    }
  }

  const carregarUsuario = useCallback(async () => {
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

        // Se for admin, busca contador de pendentes
        if (data.role === 'admin') {
          carregarContador(token)
        }

      } catch (error) {
        tentativas++
        if (tentativas < maxTentativas) {
          setTimeout(tentar, 2000)
        }
      }
    }

    tentar()
  }, [])

  async function carregarContador(token) {
    try {
      const res = await fetch('http://localhost:8000/solicitacoes/contador', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setPendentes(data.total || 0)
      }
    } catch {}
  }

  useEffect(() => {
    carregarUsuario()
  }, [carregarUsuario])

  // Atualiza o contador a cada 30s se for admin
  useEffect(() => {
    if (!usuario || usuario.role !== 'admin') return
    const token = localStorage.getItem('access_token')
    const interval = setInterval(() => carregarContador(token), 30000)
    return () => clearInterval(interval)
  }, [usuario])

  function handleSininho() {
    if (usuario?.role === 'admin') {
      navigate('/notificacoes')
    }
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

        {/* Sininho — só aparece para admin */}
        {usuario?.role === 'admin' && (
          <div className="sininho-wrapper" onClick={handleSininho}>
            <IoNotificationsOutline className="notification-icon" />
            {pendentes > 0 && (
              <span className="badge-vermelho">
                {pendentes > 99 ? '99+' : pendentes}
              </span>
            )}
          </div>
        )}
      </nav>

    </header>
  )
}

export default Header
import { Routes, Route, useLocation } from 'react-router-dom'

import Header from './components/header/header'
import Footer from './components/footer/footer'

import Home from './pages/home/home'
import Filmes from './pages/filmes/filmes'
import Favoritos from './pages/favoritos/favoritos'
import Login from './pages/login/login'
import Cadastro from './pages/cadastro/cadastro'
import Perfil from './pages/perfil/perfil'
import Detalhes from './pages/detalhes/detalhe'
import Editar from './pages/editar/editar'
import Adicionar from './pages/adicionar/adicionar'
import Notificacoes from './pages/notificacoes/notificacoes'

function App() {

  const location = useLocation()

  const esconderLayout =
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/cadastro'

  return (
    <>

      {!esconderLayout && <Header />}

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/home" element={<Home />} />
        <Route path="/filmes" element={<Filmes />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/detalhes/:id" element={<Detalhes />} />
        <Route path="/editar/:id" element={<Editar />} />
        <Route path="/adicionar" element={<Adicionar />} />
        <Route path="/notificacoes" element={<Notificacoes />} />

      </Routes>

      {!esconderLayout && <Footer />}

    </>
  )
}

export default App
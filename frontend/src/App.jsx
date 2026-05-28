import { Routes, Route } from 'react-router-dom'

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

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filmes" element={<Filmes />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/detalhes" element={<Detalhes />} />
        <Route path="/editar" element={<Editar />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
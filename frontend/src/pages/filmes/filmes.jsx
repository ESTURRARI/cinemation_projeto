import './filmes.css'

import { Link } from 'react-router-dom'
import { useState } from 'react'

import { posters } from '../../data/posters'

import { FaSearch } from "react-icons/fa";

import CardFilme from '../../components/cardfilme/cardFilme'
import { useFetch } from '../../hooks/useFetch'

function Filmes(){

  const { data: filmes, loading, erro, refetch } = useFetch('http://localhost:8000/listagem')

  const [busca, setBusca] = useState('')
  const [filtroGenero, setFiltroGenero] = useState('')
  const [filtroAno, setFiltroAno] = useState('')
  const [filtroDiretor, setFiltroDiretor] = useState('')
  const [filtroAtor, setFiltroAtor] = useState('')
  const [filtroProdutora, setFiltroProdutora] = useState('')

  if (loading) {
    return (
      <main className="filmes">
        <section className="blur-top"></section>
        <section className="conteudo-filmes">
          <p>Conectando ao servidor...</p>
        </section>
      </main>
    )
  }

  if (erro) {
    return (
      <main className="filmes">
        <section className="blur-top"></section>
        <section className="conteudo-filmes">
          <p>{erro}</p>
          <button onClick={refetch}>Tentar novamente</button>
        </section>
      </main>
    )
  }

  const filmesFiltrados = filmes.filter((filme) => {

    const termo = busca.toLowerCase()

    return (
      (
        filme.titulo?.toLowerCase().includes(termo) ||
        filme.categorias?.toLowerCase().includes(termo) ||
        filme.atores?.toLowerCase().includes(termo) ||
        filme.diretores?.toLowerCase().includes(termo) ||
        filme.produtora?.toLowerCase().includes(termo) ||
        filme.ano?.toString().includes(termo)
      )
      && (filtroGenero === '' || filme.categorias?.includes(filtroGenero))
      && (filtroAno === '' || filme.ano?.toString() === filtroAno)
      && (filtroDiretor === '' || filme.diretores?.includes(filtroDiretor))
      && (filtroAtor === '' || filme.atores?.includes(filtroAtor))
      && (filtroProdutora === '' || filme.produtora === filtroProdutora)
    )
  })

  return(

    <main className="filmes">

      <section className="blur-top"></section>

      <section className="conteudo-filmes">

        <div className="barra-pesquisa">
          <input
            type="text"
            placeholder="Busque por títulos, gêneros, atores ou anos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <FaSearch className="icone-busca" />
        </div>

        <div className="filtros">

          <select value={filtroGenero} onChange={(e) => setFiltroGenero(e.target.value)}>
            <option value="">Gênero</option>
            {[...new Set(filmes.flatMap(f => f.categorias?.split(',').map(c => c.trim()) || []))].map(genero => (
              <option key={genero} value={genero}>{genero}</option>
            ))}
          </select>

          <select value={filtroAno} onChange={(e) => setFiltroAno(e.target.value)}>
            <option value="">Ano</option>
            {[...new Set(filmes.map(f => f.ano))].sort((a,b) => b-a).map(ano => (
              <option key={ano} value={ano}>{ano}</option>
            ))}
          </select>

          <select value={filtroDiretor} onChange={(e) => setFiltroDiretor(e.target.value)}>
            <option value="">Diretor</option>
            {[...new Set(filmes.flatMap(f => f.diretores?.split(',').map(d => d.trim()) || []))].map(diretor => (
              <option key={diretor} value={diretor}>{diretor}</option>
            ))}
          </select>

          <select value={filtroAtor} onChange={(e) => setFiltroAtor(e.target.value)}>
            <option value="">Ator</option>
            {[...new Set(filmes.flatMap(f => f.atores?.split(',').map(a => a.trim()) || []))].map(ator => (
              <option key={ator} value={ator}>{ator}</option>
            ))}
          </select>

          <select value={filtroProdutora} onChange={(e) => setFiltroProdutora(e.target.value)}>
            <option value="">Produtora</option>
            {[...new Set(filmes.map(f => f.produtora))].map(produtora => (
              <option key={produtora} value={produtora}>{produtora}</option>
            ))}
          </select>

        </div>

        <section className="categoria">

          <div className="titulo-categoria">
            <h2>Todos os Filmes</h2>
            <Link to="/adicionar" className="btn-adicionar">Adicionar +</Link>
          </div>

          <div className="linha-posters">
            {filmesFiltrados.map((filme) => (
              <CardFilme
                key={filme.id}
                id={filme.id}
                imagem={posters[filme.imagem] || `http://localhost:8000/uploads/${filme.imagem}`}
                nome={filme.titulo}
                ano={filme.ano}
                genero={filme.categorias}
                sinopse={filme.sinopse}
              />
            ))}
          </div>

        </section>

      </section>

      <section className="blur-bottom"></section>

    </main>
  )
}

export default Filmes
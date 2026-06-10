import './detalhe.css'

import { FaHeart } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { posters } from '../../data/posters'
import { banners } from '../../data/banners'
import { useFetch } from '../../hooks/useFetch'

function Detalhe(){

  const { id } = useParams()

  const { data: filme, loading, erro, refetch } = useFetch(`http://localhost:8000/filme?id=${id}`)
  const [favoritado, setFavoritado] = useState(false)

  useEffect(() => {
    if (!filme) return

    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
    const existe = favoritos.find(item => item.id === filme.id)
    if (existe) setFavoritado(true)
  }, [filme])

  if (loading) {
    return <h1>Carregando...</h1>
  }

  if (erro) {
    return (
      <main className="detalhe">
        <p>{erro}</p>
        <button onClick={refetch}>Tentar novamente</button>
      </main>
    )
  }

  function toggleFavorito(){

    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || []

    if(favoritado){
      favoritos = favoritos.filter(item => item.id !== filme.id)
      setFavoritado(false)
    } else {
      favoritos.push({
        id: filme.id,
        nome: filme.titulo,
        imagem: filme.poster,
        genero: filme.categorias[0],
        ano: filme.ano
      })
      setFavoritado(true)
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos))
  }

  return(

    <main className="detalhe">

      <section className="banner-filme">
        <img src={banners[filme.banner]} alt="" className="banner-img" />
        <div className="overlay-banner"></div>
      </section>

      <section className="conteudo-filme">

        <img src={posters[filme.poster]} alt="" className="poster-detalhe" />

        <div className="info-detalhe">

          <h1>{filme.titulo}</h1>

          <div className="dados-filme">
            <span>{filme.ano}</span>
            <span>{filme.categorias.join(', ')}</span>
            <span>{filme.duracao}</span>
          </div>

          <p className="descricao">{filme.sinopse}</p>

          <div className="botoes-filme">

            <button
              className={`btn-favorito ${favoritado ? 'ativo' : ''}`}
              onClick={toggleFavorito}
            >
              <FaHeart />
              {favoritado ? 'Favoritado' : 'Favoritar'}
            </button>

            <Link to={`/editar/${id}`} className="btn-editar">
              Editar Filme
            </Link>

          </div>

        </div>

      </section>

      <section className="extra-info">

        <h2>Informações</h2>

        <div className="grid-info">

          <div className="info-box">
            <h3>Ano</h3>
            <p>{filme.ano}</p>
          </div>

          <div className="info-box">
            <h3>Gênero</h3>
            <p>{filme.categorias.join(', ')}</p>
          </div>

          <div className="info-box">
            <h3>Diretor</h3>
            <p>{filme.diretores[0]?.nome}</p>
          </div>

          <div className="info-box">
            <h3>Ator Principal</h3>
            <p>{filme.atores[0]?.nome}</p>
          </div>

          <div className="info-box">
            <h3>Orçamento</h3>
            <p>{filme.orcamento.toLocaleString('pt-BR')}</p>
          </div>

          <div className="info-box">
            <h3>Produtora</h3>
            <p>{filme.produtora_principal}</p>
          </div>

          <div className="info-box">
            <h3>Idiomas</h3>
            <p>{filme.linguagens.join(', ')}</p>
          </div>

          <div className="info-box">
            <h3>País</h3>
            <p>{filme.diretores[0]?.paises}</p>
          </div>

        </div>

      </section>

      <section className="blue-glow"></section>

    </main>
  )
}

export default Detalhe
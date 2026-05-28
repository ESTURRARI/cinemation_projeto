import './detalhe.css'

import venomBanner from '../../assets/banners/venombanner.png'
import venomPoster from '../../assets/posters/venom.png'

import { FaHeart } from "react-icons/fa";

import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'

function Detalhe(){

  const [favoritado, setFavoritado] = useState(false)

  const filme = {
    nome: 'Venom',
    imagem: venomPoster,
    genero: 'Ação',
    ano: '2018'
  }

  useEffect(() => {

    const favoritos =
      JSON.parse(localStorage.getItem('favoritos')) || []

    const existe = favoritos.find(
      item => item.nome === filme.nome
    )

    if(existe){
      setFavoritado(true)
    }

  }, [])

  function toggleFavorito(){

    let favoritos =
      JSON.parse(localStorage.getItem('favoritos')) || []

    if(favoritado){

      favoritos = favoritos.filter(
        item => item.nome !== filme.nome
      )

      setFavoritado(false)

    }else{

      favoritos.push(filme)

      setFavoritado(true)
    }

    localStorage.setItem(
      'favoritos',
      JSON.stringify(favoritos)
    )
  }

  return(

    <main className="detalhe">

      <section className="banner-filme">

        <img
          src={venomBanner}
          alt=""
          className="banner-img"
        />

        <div className="overlay-banner"></div>

      </section>

      <section className="conteudo-filme">

        <img
          src={venomPoster}
          alt=""
          className="poster-detalhe"
        />

        <div className="info-detalhe">

          <h1>Venom</h1>

          <div className="dados-filme">

            <span>2018</span>

            <span>Ação</span>

            <span>2h 20m</span>

          </div>

          <p className="descricao">

            Eddie Brock é um jornalista investigativo
            que acaba se tornando hospedeiro de um
            simbionte alienígena extremamente poderoso.
            Enquanto tenta controlar a criatura dentro
            de si, Eddie descobre habilidades
            sobrenaturais e enfrenta ameaças perigosas.

          </p>

          <div className="botoes-filme">

            <button
              className={`btn-favorito ${favoritado ? 'ativo' : ''}`}
              onClick={toggleFavorito}
            >

              <FaHeart />

              {favoritado ? 'Favoritado' : 'Favoritar'}

            </button>

            <Link
              to="/editar"
              className="btn-editar"
            >

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
            <p>2018</p>
          </div>

          <div className="info-box">
            <h3>Gênero</h3>
            <p>Ação</p>
          </div>

          <div className="info-box">
            <h3>Diretor</h3>
            <p>Ruben Fleischer</p>
          </div>

          <div className="info-box">
            <h3>Ator Principal</h3>
            <p>Tom Hardy</p>
          </div>

          <div className="info-box">
            <h3>Orçamento</h3>
            <p>$116.000.000</p>
          </div>

          <div className="info-box">
            <h3>Produtora</h3>
            <p>Marvel Studios</p>
          </div>

          <div className="info-box">
            <h3>Idiomas</h3>
            <p>Inglês, Português e Espanhol</p>
          </div>

          <div className="info-box">
            <h3>País</h3>
            <p>Estados Unidos</p>
          </div>

        </div>

      </section>

      <section className="blue-glow"></section>

    </main>

  )
}

export default Detalhe
import './favoritos.css'

import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

function Favoritos(){

  const [favoritos, setFavoritos] = useState([])

  useEffect(() => {

    const filmesSalvos =
      JSON.parse(localStorage.getItem('favoritos')) || []

    setFavoritos(filmesSalvos)

  }, [])

  return(

    <main className="favoritos">

      <section className="blur-top"></section>

      <section className="conteudo-favoritos">

        <h1>Suas animações favoritas</h1>

        <div className="grid-favoritos">

          {favoritos.map((filme, index) => (

            <Link
              to="/detalhes"
              className="card-favorito"
              key={index}
            >

              <img
                src={filme.imagem}
                alt=""
              />

              <div className="info-favorito">

                <h2>Ver mais</h2>

              </div>

            </Link>

          ))}

        </div>

      </section>

      <section className="blur-bottom"></section>

    </main>

  )
}

export default Favoritos
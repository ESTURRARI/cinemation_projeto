import './favoritos.css'

import { useEffect, useState } from 'react'

import { posters } from '../../data/posters'

import CardFilme from '../../components/cardfilme/cardFilme'

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

        {favoritos.length === 0 ? (

          <div className="sem-favoritos">

            <h2>Você ainda não possui filmes favoritos</h2>

            <p>
              Explore o catálogo e adicione seus filmes favoritos para vê-los aqui.
            </p>

          </div>

        ) : (

          <div className="grid-favoritos">

            {favoritos.map((filme) => (

              <CardFilme
                key={filme.id}
                id={filme.id}
                imagem={posters[filme.imagem]}
                nome={filme.nome}
                ano={filme.ano}
                genero={filme.genero}
                sinopse=""
              />

            ))}

          </div>

        )}

      </section>

      <section className="blur-bottom"></section>

    </main>

  )
}

export default Favoritos
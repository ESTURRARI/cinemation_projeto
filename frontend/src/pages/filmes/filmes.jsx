import './filmes.css'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { posters } from '../../data/posters'

import { MdKeyboardArrowDown } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

function Filmes(){

  const [filmes, setFilmes] = useState([])

  useEffect(() => {

    fetch('http://localhost:8000/listagem')
      .then(response => response.json())
      .then(data => {
        setFilmes(data)
      })
      .catch(error => {
        console.error(error)
      })

  }, [])

  return(

    <main className="filmes">

      <section className="blur-top"></section>

      <section className="conteudo-filmes">

        <div className="barra-pesquisa">

          <input
            type="text"
            placeholder="Busque por títulos, gêneros, atores ou anos..."
          />

          <FaSearch className="icone-busca" />

        </div>

        <div className="filtros">

          <button>
            Gênero
            <MdKeyboardArrowDown />
          </button>

          <button>
            Ano
            <MdKeyboardArrowDown />
          </button>

          <button>
            Diretor
            <MdKeyboardArrowDown />
          </button>

          <button>
            Ator
            <MdKeyboardArrowDown />
          </button>

          <button>
            Produtora
            <MdKeyboardArrowDown />
          </button>

        </div>

        <section className="categoria">

          <div className="titulo-categoria">

            <h2>Todos os Filmes</h2>

            <Link to="/adicionar" className="btn-adicionar">
              Adicionar +
            </Link>

          </div>

          <div className="linha-posters">

            {filmes.map((filme) => (

              <Link
                key={filme.id}
                to={`/detalhes/${filme.id}`}
              >
                <img
                  src={posters[filme.imagem]}
                  alt={filme.titulo}
                />
              </Link>

            ))}

          </div>

        </section>

      </section>

      <section className="blur-bottom"></section>

    </main>

  )
}

export default Filmes
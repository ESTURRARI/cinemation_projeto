import './filmes.css'

import venom from '../../assets/posters/venom.png'
import deadpool from '../../assets/posters/deadpool.png'
import thor from '../../assets/posters/thor.png'
import viuva from '../../assets/posters/viuva.png'
import spiderman3 from '../../assets/posters/spiderman3.png'

import bighero from '../../assets/posters/bighero.png'
import urso from '../../assets/posters/urso.png'
import zootopia from '../../assets/posters/zootopia2.png'
import mufasa from '../../assets/posters/mufasa.png'
import estranho from '../../assets/posters/noiva.png'

import ratatouille from '../../assets/posters/ratatouille.png'
import elementos from '../../assets/posters/elementos.png'
import up from '../../assets/posters/up.png'
import walle from '../../assets/posters/demon.png'

import coraline from '../../assets/posters/coraline.png'
import chihiro from '../../assets/posters/chihiro.png'

import black from '../../assets/posters/black.png'
import jujutsu from '../../assets/posters/jujstsu.png'
import demon from '../../assets/posters/demon.png'
import tokyo from '../../assets/posters/tokyo.png'
import chainsaw from '../../assets/posters/chainsaw.png'

import { Link } from 'react-router-dom'

import { FaSearch } from "react-icons/fa";

function Filmes(){

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

          <button>Gênero ▼</button>

          <button>Ano ▼</button>

          <button>Diretor ▼</button>

          <button>Ator ▼</button>

        </div>

        <section className="categoria">

          <div className="titulo-categoria">

            <h2>Marvel</h2>

            <span>Adicionar +</span>

          </div>

          <div className="linha-filmes">

            <Link to="/detalhes">
              <img src={venom} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={deadpool} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={thor} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={viuva} alt="" />
            </Link>

          </div>

        </section>

        <section className="categoria">

          <h2>Disney</h2>

          <div className="linha-filmes">

            <Link to="/detalhes">
              <img src={bighero} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={urso} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={zootopia} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={mufasa} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={estranho} alt="" />
            </Link>

          </div>

        </section>

        <section className="categoria">

          <h2>Pixar</h2>

          <div className="linha-filmes">

            <Link to="/detalhes">
              <img src={ratatouille} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={elementos} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={zootopia} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={up} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={walle} alt="" />
            </Link>

          </div>

        </section>

        <section className="categoria">

          <h2>Laika & Ghibli</h2>

          <div className="linha-filmes">

            <Link to="/detalhes">
              <img src={coraline} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={chihiro} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={estranho} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={up} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={chihiro} alt="" />
            </Link>

          </div>

        </section>

        <section className="categoria">

          <h2>Anime</h2>

          <div className="linha-filmes">

            <Link to="/detalhes">
              <img src={black} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={jujutsu} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={demon} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={tokyo} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={chainsaw} alt="" />
            </Link>

          </div>

        </section>

      </section>

      <section className="blur-bottom"></section>

    </main>

  )
}

export default Filmes
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
import estranho from '../../assets/posters/jack.png'

import ratatouille from '../../assets/posters/ratatouille.png'
import elementos from '../../assets/posters/elementos.png'
import up from '../../assets/posters/up.png'
import walle from '../../assets/posters/walle.png'
import monstros from '../../assets/posters/monstros.png'

import marine from '../../assets/posters/marine.png'
import coraline from '../../assets/posters/coraline.png'
import chihiro from '../../assets/posters/chihiro.png'
import noiva from '../../assets/posters/noiva.png'
import castelo from '../../assets/posters/castelo.png'

import black from '../../assets/posters/black.png'
import jujutsu from '../../assets/posters/jujstsu.png'
import demon from '../../assets/posters/demon.png'
import tokyo from '../../assets/posters/tokyo.png'
import chainsaw from '../../assets/posters/chainsaw.png'

import { Link } from 'react-router-dom'

import { MdKeyboardArrowDown } from "react-icons/md";

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

            <Link to="/detalhes">
              <img src={spiderman3} alt="" />
            </Link>

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

            <Link to="/detalhes">
              <img src={ratatouille} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={elementos} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={monstros} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={up} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={walle} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={coraline} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={chihiro} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={noiva} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={castelo} alt="" />
            </Link>

            <Link to="/detalhes">
              <img src={marine} alt="" />
            </Link>

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
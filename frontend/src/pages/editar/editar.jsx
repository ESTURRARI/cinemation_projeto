import './editar.css'

import venomBanner from '../../assets/banners/venombanner.png'
import venomPoster from '../../assets/posters/venom.png'

import { IoArrowBack } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'



function Editar(){

  const navigate = useNavigate()

  return(

    <main className="editar">

      <section className="blur-top"></section>

      <section className="conteudo-editar">

        <div className="topo-formulario">

          <button
            className="btn-voltar"

            onClick={() => navigate(-1)}
          >

            <IoArrowBack />

          </button>

          <h1>Editar Filme</h1>

        </div>

        <section className="area-edicao">

          <div className="coluna-esquerda">

            <div className="poster-area">

              <img
                src={venomPoster}
                alt=""
                className="poster-preview"
              />

              <button className="btn-camera">

                <FaCamera />

              </button>

            </div>

            <div className="banner-area">

              <img
                src={venomBanner}
                alt=""
                className="banner-preview"
              />

              <button className="btn-camera-banner">

                <FaCamera />

              </button>

            </div>

          </div>

          <form className="formulario">

            <div className="grupo-input">

              <label>Título:</label>

              <div className="input-editavel">

                <input
                  type="text"
                  value="Venom"
                />

                <FaPen className="icone-lapis" />

              </div>

            </div>

            <div className="linha-inputs">

              <div className="grupo-input">

                <label>Ano:</label>

                <div className="input-editavel">

                  <input
                    type="text"
                    value="2018"
                  />

                  <FaPen className="icone-lapis" />

                </div>

              </div>

              <div className="grupo-input">

                <label>Gênero:</label>

                <div className="input-editavel">

                  <input
                    type="text"
                    value="Ação"
                  />

                  <FaPen className="icone-lapis" />

                </div>

              </div>

            </div>

            <div className="grupo-input">

              <label>Sinopse:</label>

              <div className="input-editavel">

                <textarea>

Venom (2018) conta a história do jornalista Eddie Brock (Tom Hardy) que, após perder carreira e noiva, funde-se com um simbionte alienígena chamado Venom.

                </textarea>

                <FaPen className="icone-lapis textarea-pen" />

              </div>

            </div>

            <div className="linha-inputs">

              <div className="grupo-input">

                <label>Diretor:</label>

                <div className="input-editavel">

                  <input
                    type="text"
                    value="Ruben Fleischer"
                  />

                  <FaPen className="icone-lapis" />

                </div>

              </div>

              <div className="grupo-input">

                <label>Ator Principal:</label>

                <div className="input-editavel">

                  <input
                    type="text"
                    value="Tom Hardy"
                  />

                  <FaPen className="icone-lapis" />

                </div>

              </div>

            </div>

            <div className="linha-inputs">

              <div className="grupo-input">

                <label>Produtora:</label>

                <div className="input-editavel">

                  <input
                    type="text"
                    value="Marvel Studios"
                  />

                  <FaPen className="icone-lapis" />

                </div>

              </div>

              <div className="grupo-input">

                <label>Orçamento:</label>

                <div className="input-editavel">

                  <input
                    type="text"
                    value="$116.000.000"
                  />

                  <FaPen className="icone-lapis" />

                </div>

              </div>

            </div>

            <div className="linha-inputs">

              <div className="grupo-input">

                <label>Idiomas:</label>

                <div className="input-editavel">

                  <input
                    type="text"
                    value="Inglês, Português e Espanhol"
                  />

                  <FaPen className="icone-lapis" />

                </div>

              </div>

              <div className="grupo-input">

                <label>País de origem:</label>

                <div className="input-editavel">

                  <input
                    type="text"
                    value="Estados Unidos"
                  />

                  <FaPen className="icone-lapis" />

                </div>

              </div>

            </div>

            <div className="botoes-admin">

              <button className="btn-cancelar">

                Cancelar

              </button>

              <button className="btn-excluir">

                Excluir

              </button>

              <button className="btn-editar">

                Editar

              </button>

            </div>

          </form>

        </section>

      </section>

      <section className="blur-bottom"></section>

    </main>

  )
}

export default Editar
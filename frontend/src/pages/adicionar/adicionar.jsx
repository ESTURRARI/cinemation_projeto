import './adicionar.css'

import { IoArrowBack } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

import { useNavigate } from 'react-router-dom'

function Adicionar(){

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

          <h1>Adicionar Filme</h1>

        </div>

        <section className="area-edicao">

          <div className="coluna-esquerda">

            <div className="poster-area">

              <div className="poster-preview vazio">

                <input type="file" />

                <FaCamera />

              </div>

            </div>

            <div className="banner-area">

              <div className="banner-preview vazio">

                <FaCamera />

              </div>

            </div>

          </div>

          <form className="formulario">

            <div className="grupo-input">

              <label>Título:</label>

              <div className="input-editavel">

                <input
                  type="text"
                  placeholder="Digite o título"
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
                    placeholder="Digite o ano"
                  />

                  <FaPen className="icone-lapis" />

                </div>

              </div>

              <div className="grupo-input">

                <label>Gênero:</label>

                <div className="input-editavel">

                  <input
                    type="text"
                    placeholder="Digite o gênero"
                  />

                  <FaPen className="icone-lapis" />

                </div>

              </div>

            </div>

            <div className="grupo-input">

              <label>Sinopse:</label>

              <div className="input-editavel">

                <textarea
                    placeholder="Digite a sinopse"
                ></textarea>

                <FaPen className="icone-lapis textarea-pen" />

              </div>

            </div>

            <div className="linha-inputs">

              <div className="grupo-input">

                <label>Diretor:</label>

                <div className="input-editavel">

                  <input
                    type="text"
                    placeholder="Digite o diretor"
                  />

                  <FaPen className="icone-lapis" />

                </div>

              </div>

              <div className="grupo-input">

                <label>Ator Principal:</label>

                <div className="input-editavel">

                  <input
                    type="text"
                    placeholder="Digite o ator principal"
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
                    placeholder="Digite a produtora"
                  />

                  <FaPen className="icone-lapis" />

                </div>

              </div>

              <div className="grupo-input">

                <label>Orçamento:</label>

                <div className="input-editavel">

                  <input
                    type="text"
                    placeholder="Digite o orçamento"
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
                    placeholder="Digite os idiomas"
                  />

                  <FaPen className="icone-lapis" />

                </div>

              </div>

              <div className="grupo-input">

                <label>País de origem:</label>

                <div className="input-editavel">

                  <input
                    type="text"
                    placeholder="Digite o país"
                  />

                  <FaPen className="icone-lapis" />

                </div>

              </div>

            </div>

            <div className="botoes-admin">

              <button className="btn-cancelar">

                Cancelar

              </button>

              <button className="btn-adicionar">

                Adicionar

              </button>

            </div>

          </form>

        </section>

      </section>

      <section className="blur-bottom"></section>

    </main>

  )
}

export default Adicionar
import './adicionar.css'

import { IoArrowBack } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Adicionar() {

  const navigate = useNavigate()
  const [poster, setPoster] = useState(null)
  const [banner, setBanner] = useState(null)
  const [previewPoster, setPreviewPoster] = useState('')
  const [previewBanner, setPreviewBanner] = useState('')
  const [titulo, setTitulo] = useState('')
  const [ano, setAno] = useState('')
  const [genero, setGenero] = useState('')
  const [sinopse, setSinopse] = useState('')
  const [orcamento, setOrcamento] = useState('')
  const [idioma, setIdioma] = useState('')
  const [pais, setPais] = useState('')
  const [duracao, setDuracao] = useState('')
  const [categorias, setCategorias] = useState([])
  const [idiomas, setIdiomas] = useState([])
  const [paises, setPaises] = useState([])

  // New states for actors, directors and studios
  const [atores, setAtores] = useState([])
  const [diretores, setDiretores] = useState([])
  const [produtoras, setProdutoras] = useState([])

  const [atorSelecionado, setAtorSelecionado] = useState('')
  const [diretorSelecionado, setDiretorSelecionado] = useState('')
  const [produtoraSelecionada, setProdutoraSelecionada] = useState('')

  useEffect(() => {

    fetch('http://localhost:8000/categorias')
      .then(res => res.json())
      .then(data => setCategorias(data))

    fetch('http://localhost:8000/linguagens')
      .then(res => res.json())
      .then(data => setIdiomas(data))

    fetch('http://localhost:8000/paises')
      .then(res => res.json())
      .then(data => setPaises(data))

    // Fetch actors, directors and studios
    fetch('http://localhost:8000/atores')
      .then(res => res.json())
      .then(data => setAtores(data))

    fetch('http://localhost:8000/diretores')
      .then(res => res.json())
      .then(data => setDiretores(data))

    fetch('http://localhost:8000/produtoras')
      .then(res => res.json())
      .then(data => setProdutoras(data))

  }, [])

  // FIX 1: uploadImagem function defined
  async function uploadImagem(arquivo) {

    const token = localStorage.getItem('access_token')

    const formData = new FormData()
    formData.append('file', arquivo)

    const response = await fetch('http://localhost:8000/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })

    const data = await response.json()

    return data.filename

  }

  // FIX 2 & 3: try/catch complete + handleSubmit properly closed
  async function handleSubmit(e) {

    e.preventDefault()

    const token = localStorage.getItem('access_token')

    let nomePoster = null
    let nomeBanner = null

    if (poster) {
      nomePoster = await uploadImagem(poster)
    }

    if (banner) {
      nomeBanner = await uploadImagem(banner)
    }

    const novoFilme = {
      titulo,
      ano,
      sinopse,
      orcamento,
      duracao,

      imagem: nomePoster,
      banner: nomeBanner,

      categoria_id: [Number(genero)],
      linguagem_id: [Number(idioma)],
      pais_origem_id: [Number(pais)],

      produtora_id: [Number(produtoraSelecionada)],
      diretor_id: [Number(diretorSelecionado)],
      atores_ids: [Number(atorSelecionado)],
    }

    try {

      const response = await fetch(
        'http://localhost:8000/cadastrani',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },

          body: JSON.stringify(novoFilme)
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Erro ao cadastrar filme')
        return
      }

      alert('Filme enviado com sucesso!')

    } catch (error) {

      console.error(error)

      alert('Erro ao cadastrar filme.')

    }

  } // end handleSubmit

  return (

    <main className="editar">

      <section className="blur-top"></section>

      <section className="conteudo-editar">

        <div className="topo-formulario">

          <button
            type="button"
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

              <div className={`poster-preview ${previewPoster ? '' : 'vazio'}`}>

                <label className="upload-area">

                  {previewPoster ? (

                    <img src={previewPoster} alt="Poster" />

                  ) : (

                    <>
                      <FaCamera />
                      <h3>Adicionar Poster</h3>
                      <p>Clique para selecionar uma imagem</p>
                    </>

                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {

                      const arquivo = e.target.files[0]

                      setPoster(arquivo)

                      if (arquivo) {
                        setPreviewPoster(URL.createObjectURL(arquivo))
                      }

                    }}
                  />

                </label>

              </div>

            </div>

            <div className="banner-area">

              <div className={`banner-preview ${previewBanner ? '' : 'vazio'}`}>

                <label className="upload-area">

                  {previewBanner ? (

                    <img src={previewBanner} alt="Banner" />

                  ) : (

                    <>
                      <FaCamera />
                      <h3>Adicionar Banner</h3>
                      <p>Clique para selecionar uma imagem</p>
                    </>

                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {

                      const arquivo = e.target.files[0]

                      setBanner(arquivo)

                      if (arquivo) {
                        setPreviewBanner(URL.createObjectURL(arquivo))
                      }

                    }}
                  />

                </label>

              </div>

            </div>

          </div>

          <form className="formulario" onSubmit={handleSubmit}>

            <div className="grupo-input">

              <label>Título:</label>

              <div className="input-editavel">

                <input
                  type="text"
                  placeholder="Digite o título"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
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
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                  />

                  <FaPen className="icone-lapis" />

                </div>

              </div>

              <div className="grupo-input">

                <label>Gênero:</label>

                <div className="input-editavel">

                  <select
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                  >

                    <option value="">Selecione um gênero</option>

                    {categorias.map((categoria) => (

                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nome}
                      </option>

                    ))}

                  </select>

                  <FaPen className="icone-lapis" />

                </div>

              </div>

            </div>

            <div className="grupo-input">

              <label>Sinopse:</label>

              <div className="input-editavel">

                <textarea
                  placeholder="Digite a sinopse"
                  value={sinopse}
                  onChange={(e) => setSinopse(e.target.value)}
                ></textarea>

                <FaPen className="icone-lapis textarea-pen" />

              </div>

            </div>

            <div className="linha-inputs">

              {/* Director select */}
              <div className="grupo-input">

                <label>Diretor:</label>

                <div className="input-editavel">

                  <select
                    value={diretorSelecionado}
                    onChange={(e) => setDiretorSelecionado(e.target.value)}
                  >

                    <option value="">Selecione</option>

                    {diretores.map(diretor => (

                      <option key={diretor.id} value={diretor.id}>
                        {diretor.nome} {diretor.sobrenome}
                      </option>

                    ))}

                  </select>

                  <FaPen className="icone-lapis" />

                </div>

              </div>

              {/* Actor select */}
              <div className="grupo-input">

                <label>Ator Principal:</label>

                <div className="input-editavel">

                  <select
                    value={atorSelecionado}
                    onChange={(e) => setAtorSelecionado(e.target.value)}
                  >

                    <option value="">Selecione</option>

                    {atores.map(ator => (

                      <option key={ator.id} value={ator.id}>
                        {ator.nome} {ator.sobrenome}
                      </option>

                    ))}

                  </select>

                  <FaPen className="icone-lapis" />

                </div>

              </div>

            </div>

            <div className="linha-inputs">

              {/* Studio select */}
              <div className="grupo-input">

                <label>Produtora:</label>

                <div className="input-editavel">

                  <select
                    value={produtoraSelecionada}
                    onChange={(e) => setProdutoraSelecionada(e.target.value)}
                  >

                    <option value="">Selecione</option>

                    {produtoras.map(produtora => (

                      <option key={produtora.id} value={produtora.id}>
                        {produtora.nome}
                      </option>

                    ))}

                  </select>

                  <FaPen className="icone-lapis" />

                </div>

              </div>

              <div className="grupo-input">

                <label>Orçamento:</label>

                <div className="input-editavel">

                  <input
                    type="text"
                    placeholder="Digite o orçamento"
                    value={orcamento}
                    onChange={(e) => setOrcamento(e.target.value)}
                  />

                  <FaPen className="icone-lapis" />

                </div>

              </div>

            </div>

            <div className="linha-inputs">

              <div className="grupo-input">

                <label>Idiomas:</label>

                <div className="input-editavel">

                  <select
                    value={idioma}
                    onChange={(e) => setIdioma(e.target.value)}
                  >

                    <option value="">Selecione um idioma</option>

                    {idiomas.map((idioma) => (

                      <option key={idioma.id} value={idioma.id}>
                        {idioma.nome}
                      </option>

                    ))}

                  </select>

                  <FaPen className="icone-lapis" />

                </div>

              </div>

              <div className="grupo-input">

                <label>País de origem:</label>

                <div className="input-editavel">

                  <select
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                  >

                    <option value="">Selecione um país</option>

                    {paises.map((pais) => (

                      <option key={pais.id} value={pais.id}>
                        {pais.nome}
                      </option>

                    ))}

                  </select>

                  <FaPen className="icone-lapis" />

                </div>

              </div>

            </div>

            {/* FIX 4: Duracao input added to the form */}
            <div className="linha-inputs">

              <div className="grupo-input">

                <label>Duração (min):</label>

                <div className="input-editavel">

                  <input
                    type="text"
                    placeholder="Digite a duração em minutos"
                    value={duracao}
                    onChange={(e) => setDuracao(e.target.value)}
                  />

                  <FaPen className="icone-lapis" />

                </div>

              </div>

            </div>

            <div className="botoes-admin">

              <button
                type="button"
                className="btn-cancelar"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </button>

              <button type="submit" className="btn-adicionar">
                Adicionar
              </button>

            </div>

          </form>

        </section>

      </section>

      <section className="blur-bottom"></section>

    </main>

  )

} // end Adicionar

export default Adicionar
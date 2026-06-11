import './adicionar.css'

import { IoArrowBack } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function getRoleFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
    return payload.role
  } catch {
    return null
  }
}

function Adicionar() {

  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)

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

  const [nomeAtor, setNomeAtor] = useState('')
  const [nomeDiretor, setNomeDiretor] = useState('')
  const [nomeProdutora, setNomeProdutora] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) setIsAdmin(getRoleFromToken(token) === 'admin')

    fetch('http://localhost:8000/categorias').then(r => r.json()).then(setCategorias)
    fetch('http://localhost:8000/linguagens').then(r => r.json()).then(setIdiomas)
    fetch('http://localhost:8000/paises').then(r => r.json()).then(setPaises)
  }, [])

  async function uploadImagem(arquivo) {
    const base64 = await new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result.split(',')[1])
      reader.readAsDataURL(arquivo)
    })
    const response = await fetch('http://localhost:8000/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: arquivo.name, imagem: base64 })
    })
    const data = await response.json()
    return data.arquivo
  }

  function montarDados(nomePoster, nomeBanner) {
    return {
      titulo, ano, sinopse, orcamento, duracao,
      imagem: nomePoster,
      banner: nomeBanner,
      categoria_id: [Number(genero)],
      linguagem_id: [Number(idioma)],
      pais_origem_id: [Number(pais)],
      diretor_nome: nomeDiretor,
      ator_nome: nomeAtor,
      produtora_nome: nomeProdutora,
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const token = localStorage.getItem('access_token')
    let nomePoster = null, nomeBanner = null
    if (poster) nomePoster = await uploadImagem(poster)
    if (banner) nomeBanner = await uploadImagem(banner)

    const dados = montarDados(nomePoster, nomeBanner)

    try {
      let response

      if (isAdmin) {
        // Admin: cadastra direto
        response = await fetch('http://localhost:8000/cadastrani', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(dados)
        })
      } else {
        // Usuário comum: envia solicitação de adição
        response = await fetch('http://localhost:8000/solicitacoes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ tipo: 'adicao', dados })
        })
      }

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Erro ao enviar')
        return
      }

      alert(isAdmin
        ? 'Filme cadastrado com sucesso!'
        : 'Solicitação de adição enviada! Aguarde a aprovação do administrador.'
      )
      navigate(-1)

    } catch (error) {
      console.error(error)
      alert('Erro ao enviar.')
    }
  }

  return (
    <main className="editar">

      <section className="blur-top"></section>

      <section className="conteudo-editar">

        <div className="topo-formulario">
          <button type="button" className="btn-voltar" onClick={() => navigate(-1)}>
            <IoArrowBack />
          </button>
          <h1>{isAdmin ? 'Adicionar Filme' : 'Solicitar Adição'}</h1>
        </div>

        {!isAdmin && (
          <p className="aviso-solicitacao">
            Sua solicitação será enviada para análise do administrador.
          </p>
        )}

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
                  <input type="file" accept="image/*"
                    onChange={(e) => {
                      const arquivo = e.target.files[0]
                      setPoster(arquivo)
                      if (arquivo) setPreviewPoster(URL.createObjectURL(arquivo))
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
                  <input type="file" accept="image/*"
                    onChange={(e) => {
                      const arquivo = e.target.files[0]
                      setBanner(arquivo)
                      if (arquivo) setPreviewBanner(URL.createObjectURL(arquivo))
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
                <input type="text" placeholder="Digite o título" value={titulo}
                  onChange={(e) => setTitulo(e.target.value)} />
                <FaPen className="icone-lapis" />
              </div>
            </div>

            <div className="linha-inputs">
              <div className="grupo-input">
                <label>Ano:</label>
                <div className="input-editavel">
                  <input type="text" placeholder="Digite o ano" value={ano}
                    onChange={(e) => setAno(e.target.value)} />
                  <FaPen className="icone-lapis" />
                </div>
              </div>

              <div className="grupo-input">
                <label>Gênero:</label>
                <div className="input-editavel">
                  <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                    <option value="">Selecione um gênero</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                    ))}
                  </select>
                  <FaPen className="icone-lapis" />
                </div>
              </div>
            </div>

            <div className="grupo-input">
              <label>Sinopse:</label>
              <div className="input-editavel">
                <textarea placeholder="Digite a sinopse" value={sinopse}
                  onChange={(e) => setSinopse(e.target.value)}></textarea>
                <FaPen className="icone-lapis textarea-pen" />
              </div>
            </div>

            <div className="linha-inputs">
              <div className="grupo-input">
                <label>Diretor:</label>
                <div className="input-editavel">
                  <input type="text" placeholder="Nome completo do diretor" value={nomeDiretor}
                    onChange={(e) => setNomeDiretor(e.target.value)} />
                  <FaPen className="icone-lapis" />
                </div>
              </div>

              <div className="grupo-input">
                <label>Ator Principal:</label>
                <div className="input-editavel">
                  <input type="text" placeholder="Nome completo do ator" value={nomeAtor}
                    onChange={(e) => setNomeAtor(e.target.value)} />
                  <FaPen className="icone-lapis" />
                </div>
              </div>
            </div>

            <div className="linha-inputs">
              <div className="grupo-input">
                <label>Produtora:</label>
                <div className="input-editavel">
                  <input type="text" placeholder="Nome da produtora" value={nomeProdutora}
                    onChange={(e) => setNomeProdutora(e.target.value)} />
                  <FaPen className="icone-lapis" />
                </div>
              </div>

              <div className="grupo-input">
                <label>Orçamento:</label>
                <div className="input-editavel">
                  <input type="text" placeholder="Digite o orçamento" value={orcamento}
                    onChange={(e) => setOrcamento(e.target.value)} />
                  <FaPen className="icone-lapis" />
                </div>
              </div>
            </div>

            <div className="linha-inputs">
              <div className="grupo-input">
                <label>Idiomas:</label>
                <div className="input-editavel">
                  <select value={idioma} onChange={(e) => setIdioma(e.target.value)}>
                    <option value="">Selecione um idioma</option>
                    {idiomas.map((i) => (
                      <option key={i.id} value={i.id}>{i.nome}</option>
                    ))}
                  </select>
                  <FaPen className="icone-lapis" />
                </div>
              </div>

              <div className="grupo-input">
                <label>País de origem:</label>
                <div className="input-editavel">
                  <select value={pais} onChange={(e) => setPais(e.target.value)}>
                    <option value="">Selecione um país</option>
                    {paises.map((p) => (
                      <option key={p.id} value={p.id}>{p.nome}</option>
                    ))}
                  </select>
                  <FaPen className="icone-lapis" />
                </div>
              </div>
            </div>

            <div className="linha-inputs">
              <div className="grupo-input">
                <label>Duração (min):</label>
                <div className="input-editavel">
                  <input type="text" placeholder="Digite a duração em minutos" value={duracao}
                    onChange={(e) => setDuracao(e.target.value)} />
                  <FaPen className="icone-lapis" />
                </div>
              </div>
            </div>

            <div className="botoes-admin">
              <button type="button" className="btn-cancelar" onClick={() => navigate(-1)}>
                Cancelar
              </button>
              <button type="submit" className="btn-adicionar">
                {isAdmin ? 'Adicionar' : 'Solicitar Adição'}
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
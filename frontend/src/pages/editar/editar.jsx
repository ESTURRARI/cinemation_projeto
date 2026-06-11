import './editar.css'

import { IoArrowBack } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { posters } from '../../data/posters'
import { banners } from '../../data/banners'

// Decodifica o role do JWT sem biblioteca
function getRoleFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))
    return payload.role
  } catch {
    return null
  }
}

function Editar() {

  const navigate = useNavigate()
  const { id } = useParams()

  const [filme, setFilme] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const [titulo, setTitulo] = useState('')
  const [ano, setAno] = useState('')
  const [sinopse, setSinopse] = useState('')
  const [orcamento, setOrcamento] = useState('')
  const [duracao, setDuracao] = useState('')
  const [nomeDiretor, setNomeDiretor] = useState('')
  const [nomeAtor, setNomeAtor] = useState('')
  const [nomeProdutora, setNomeProdutora] = useState('')

  const [poster, setPoster] = useState(null)
  const [banner, setBanner] = useState(null)
  const [previewPoster, setPreviewPoster] = useState('')
  const [previewBanner, setPreviewBanner] = useState('')

  const [categorias, setCategorias] = useState([])
  const [idiomas, setIdiomas] = useState([])
  const [paises, setPaises] = useState([])
  const [generoSelecionado, setGeneroSelecionado] = useState('')
  const [idiomaSelecionado, setIdiomaSelecionado] = useState('')
  const [paisSelecionado, setPaisSelecionado] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) setIsAdmin(getRoleFromToken(token) === 'admin')

    fetch(`http://localhost:8000/filme?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setFilme(data)
        setTitulo(data.titulo || '')
        setAno(data.ano || '')
        setSinopse(data.sinopse || '')
        setOrcamento(data.orcamento || '')
        setDuracao(data.duracao || '')
        setNomeDiretor(data.diretores?.[0]?.nome || '')
        setNomeAtor(data.atores?.[0]?.nome || '')
        setNomeProdutora(data.produtora_principal || '')
        setPreviewPoster(
          data.poster
            ? (posters[data.poster] || `http://localhost:8000/uploads/${data.poster}`)
            : ''
        )
        setPreviewBanner(
          data.banner
            ? (banners[data.banner] || `http://localhost:8000/uploads/${data.banner}`)
            : ''
        )
        setLoading(false)
      })
      .catch(() => setLoading(false))

    fetch('http://localhost:8000/categorias').then(r => r.json()).then(setCategorias)
    fetch('http://localhost:8000/linguagens').then(r => r.json()).then(setIdiomas)
    fetch('http://localhost:8000/paises').then(r => r.json()).then(setPaises)
  }, [id])

  useEffect(() => {
    if (!filme || categorias.length === 0) return
    const cat = categorias.find(c => filme.categorias?.includes(c.nome))
    if (cat) setGeneroSelecionado(cat.id)
  }, [filme, categorias])

  useEffect(() => {
    if (!filme || idiomas.length === 0) return
    const idioma = idiomas.find(i => filme.linguagens?.includes(i.nome))
    if (idioma) setIdiomaSelecionado(idioma.id)
  }, [filme, idiomas])

  useEffect(() => {
    if (!filme || paises.length === 0) return
    const pais = paises.find(p => filme.paises?.includes(p.nome))
    if (pais) setPaisSelecionado(pais.id)
  }, [filme, paises])

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

  function montarPayload(nomePoster, nomeBanner) {
    const payload = {
      titulo, ano, sinopse, orcamento, duracao,
      diretor_nome: nomeDiretor,
      ator_nome: nomeAtor,
      produtora_nome: nomeProdutora,
      categoria_id: generoSelecionado ? [Number(generoSelecionado)] : [],
      linguagem_id: idiomaSelecionado ? [Number(idiomaSelecionado)] : [],
      pais_origem_id: paisSelecionado ? [Number(paisSelecionado)] : [],
    }
    if (nomePoster) payload.imagem = nomePoster
    if (nomeBanner) payload.banner = nomeBanner
    return payload
  }

  async function handleExcluir() {
    if (!confirm('Tem certeza que deseja excluir este filme?')) return
    const token = localStorage.getItem('access_token')
    const response = await fetch(`http://localhost:8000/filme?id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (response.ok) {
      alert('Filme excluído com sucesso!')
      navigate('/filmes')
    } else {
      const data = await response.json()
      alert(data.error || 'Erro ao excluir filme')
    }
  }

  // Admin: salva diretamente via PATCH
  async function handleSubmitAdmin(e) {
    e.preventDefault()
    const token = localStorage.getItem('access_token')
    let nomePoster = null, nomeBanner = null
    if (poster) nomePoster = await uploadImagem(poster)
    if (banner) nomeBanner = await uploadImagem(banner)

    try {
      const response = await fetch(`http://localhost:8000/filme?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(montarPayload(nomePoster, nomeBanner))
      })
      const data = await response.json()
      if (!response.ok) { alert(data.error || 'Erro ao editar filme'); return }
      alert('Filme editado com sucesso!')
      navigate(-1)
    } catch {
      alert('Erro ao editar filme.')
    }
  }

  // Usuário comum: envia solicitação de edição
  async function handleSubmitSolicitacao(e) {
    e.preventDefault()
    const token = localStorage.getItem('access_token')
    let nomePoster = null, nomeBanner = null
    if (poster) nomePoster = await uploadImagem(poster)
    if (banner) nomeBanner = await uploadImagem(banner)

    const dados = montarPayload(nomePoster, nomeBanner)

    try {
      const response = await fetch('http://localhost:8000/solicitacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ tipo: 'edicao', id_filme: Number(id), dados })
      })
      const data = await response.json()
      if (!response.ok) { alert(data.error || 'Erro ao enviar solicitação'); return }
      alert('Solicitação de edição enviada! Aguarde a aprovação do administrador.')
      navigate(-1)
    } catch {
      alert('Erro ao enviar solicitação.')
    }
  }

  if (loading) return <h1 style={{ color: 'white', padding: '40px' }}>Carregando...</h1>
  if (!filme) return <h1 style={{ color: 'white', padding: '40px' }}>Filme não encontrado.</h1>

  const handleSubmit = isAdmin ? handleSubmitAdmin : handleSubmitSolicitacao

  return (
    <main className="editar">

      <section className="blur-top"></section>

      <section className="conteudo-editar">

        <div className="topo-formulario">
          <button type="button" className="btn-voltar" onClick={() => navigate(-1)}>
            <IoArrowBack />
          </button>
          <h1>{isAdmin ? 'Editar Filme' : 'Solicitar Edição'}</h1>
        </div>

        {!isAdmin && (
          <p className="aviso-solicitacao">
            Suas alterações serão enviadas para análise do administrador.
          </p>
        )}

        <section className="area-edicao">

          <div className="coluna-esquerda">

            <div className="poster-area">
              {previewPoster && (
                <img src={previewPoster} alt="Poster" className="poster-preview" />
              )}
              <label className="btn-camera" style={{ cursor: 'pointer' }}>
                <FaCamera />
                <input type="file" accept="image/*" style={{ display: 'none' }}
                  onChange={(e) => {
                    const arquivo = e.target.files[0]
                    setPoster(arquivo)
                    if (arquivo) setPreviewPoster(URL.createObjectURL(arquivo))
                  }}
                />
              </label>
            </div>

            <div className="banner-area">
              {previewBanner && (
                <img src={previewBanner} alt="Banner" className="banner-preview" />
              )}
              <label className="btn-camera-banner" style={{ cursor: 'pointer' }}>
                <FaCamera />
                <input type="file" accept="image/*" style={{ display: 'none' }}
                  onChange={(e) => {
                    const arquivo = e.target.files[0]
                    setBanner(arquivo)
                    if (arquivo) setPreviewBanner(URL.createObjectURL(arquivo))
                  }}
                />
              </label>
            </div>

          </div>

          <form className="formulario" onSubmit={handleSubmit}>

            <div className="grupo-input">
              <label>Título:</label>
              <div className="input-editavel">
                <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                <FaPen className="icone-lapis" />
              </div>
            </div>

            <div className="linha-inputs">
              <div className="grupo-input">
                <label>Ano:</label>
                <div className="input-editavel">
                  <input type="text" value={ano} onChange={(e) => setAno(e.target.value)} />
                  <FaPen className="icone-lapis" />
                </div>
              </div>

              <div className="grupo-input">
                <label>Gênero:</label>
                <div className="input-editavel">
                  <select value={generoSelecionado} onChange={(e) => setGeneroSelecionado(e.target.value)}>
                    <option value="">Selecione um gênero</option>
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.nome}</option>
                    ))}
                  </select>
                  <FaPen className="icone-lapis" />
                </div>
              </div>
            </div>

            <div className="grupo-input">
              <label>Sinopse:</label>
              <div className="input-editavel">
                <textarea value={sinopse} onChange={(e) => setSinopse(e.target.value)}></textarea>
                <FaPen className="icone-lapis textarea-pen" />
              </div>
            </div>

            <div className="linha-inputs">
              <div className="grupo-input">
                <label>Diretor:</label>
                <div className="input-editavel">
                  <input type="text" value={nomeDiretor} onChange={(e) => setNomeDiretor(e.target.value)} />
                  <FaPen className="icone-lapis" />
                </div>
              </div>

              <div className="grupo-input">
                <label>Ator Principal:</label>
                <div className="input-editavel">
                  <input type="text" value={nomeAtor} onChange={(e) => setNomeAtor(e.target.value)} />
                  <FaPen className="icone-lapis" />
                </div>
              </div>
            </div>

            <div className="linha-inputs">
              <div className="grupo-input">
                <label>Produtora:</label>
                <div className="input-editavel">
                  <input type="text" value={nomeProdutora} onChange={(e) => setNomeProdutora(e.target.value)} />
                  <FaPen className="icone-lapis" />
                </div>
              </div>

              <div className="grupo-input">
                <label>Orçamento:</label>
                <div className="input-editavel">
                  <input type="text" value={orcamento} onChange={(e) => setOrcamento(e.target.value)} />
                  <FaPen className="icone-lapis" />
                </div>
              </div>
            </div>

            <div className="linha-inputs">
              <div className="grupo-input">
                <label>Idiomas:</label>
                <div className="input-editavel">
                  <select value={idiomaSelecionado} onChange={(e) => setIdiomaSelecionado(e.target.value)}>
                    <option value="">Selecione um idioma</option>
                    {idiomas.map((idioma) => (
                      <option key={idioma.id} value={idioma.id}>{idioma.nome}</option>
                    ))}
                  </select>
                  <FaPen className="icone-lapis" />
                </div>
              </div>

              <div className="grupo-input">
                <label>País de origem:</label>
                <div className="input-editavel">
                  <select value={paisSelecionado} onChange={(e) => setPaisSelecionado(e.target.value)}>
                    <option value="">Selecione um país</option>
                    {paises.map((pais) => (
                      <option key={pais.id} value={pais.id}>{pais.nome}</option>
                    ))}
                  </select>
                  <FaPen className="icone-lapis" />
                </div>
              </div>
            </div>

            <div className="linha-inputs">
              <div className="grupo-input">
                <label>Duração:</label>
                <div className="input-editavel">
                  <input type="text" value={duracao} onChange={(e) => setDuracao(e.target.value)} />
                  <FaPen className="icone-lapis" />
                </div>
              </div>
            </div>

            <div className="botoes-admin">
              <button type="button" className="btn-cancelar" onClick={() => navigate(-1)}>
                Cancelar
              </button>
              {isAdmin && (
                <button type="button" className="btn-excluir" onClick={handleExcluir}>
                  Excluir
                </button>
              )}
              <button type="submit" className="btn-editar">
                {isAdmin ? 'Salvar' : 'Solicitar Edição'}
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
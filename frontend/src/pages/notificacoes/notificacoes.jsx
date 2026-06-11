import './notificacoes.css'

import { IoArrowBack, IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5"
import { IoNotificationsOutline } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Notificacoes() {

  const navigate = useNavigate()
  const [solicitacoes, setSolicitacoes] = useState([])
  const [loading, setLoading] = useState(true)
  const [mensagens, setMensagens] = useState({})
  const [processando, setProcessando] = useState(null)

  useEffect(() => {
    carregarSolicitacoes()
  }, [])

  async function carregarSolicitacoes() {
    setLoading(true)
    const token = localStorage.getItem('access_token')
    try {
      const res = await fetch('http://localhost:8000/solicitacoes/pendentes', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) {
        if (res.status === 403) { navigate('/home'); return }
        setSolicitacoes([])
      } else {
        const data = await res.json()
        setSolicitacoes(data)
      }
    } catch {
      setSolicitacoes([])
    } finally {
      setLoading(false)
    }
  }

  async function responder(id, status) {
    setProcessando(id)
    const token = localStorage.getItem('access_token')
    try {
      const res = await fetch(`http://localhost:8000/solicitacoes?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status, mensagem: mensagens[id] || null })
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'Erro ao responder solicitação')
      } else {
        setSolicitacoes(prev => prev.filter(s => s.id_solicitacao !== id))
      }
    } catch {
      alert('Erro de conexão.')
    } finally {
      setProcessando(null)
    }
  }

  function formatarDados(dados) {
    if (!dados) return null
    const campos = {
      titulo:         'Título',
      ano:            'Ano',
      sinopse:        'Sinopse',
      duracao:        'Duração',
      orcamento:      'Orçamento',
      diretor_nome:   'Diretor',
      ator_nome:      'Ator principal',
      produtora_nome: 'Produtora',
    }
    return Object.entries(campos)
      .filter(([key]) => dados[key])
      .map(([key, label]) => (
        <div key={key} className="dado-linha">
          <span className="dado-label">{label}:</span>
          <span className="dado-valor">
            {key === 'sinopse'
              ? (dados[key].length > 120 ? dados[key].slice(0, 120) + '…' : dados[key])
              : dados[key]
            }
          </span>
        </div>
      ))
  }

  if (loading) return (
    <main className="notificacoes-page">
      <section className="notificacoes-top"></section>
      <p className="carregando">Carregando...</p>
    </main>
  )

  return (
    <main className="notificacoes-page">

      <section className="notificacoes-top"></section>

      <section className="conteudo-notificacoes">

        <div className="topo-notificacoes">
          <button className="btn-voltar" onClick={() => navigate(-1)}>
            <IoArrowBack />
          </button>
          <h1>
            <IoNotificationsOutline className="icone-titulo" />
            Solicitações Pendentes
          </h1>
          <span className="contador-badge">{solicitacoes.length}</span>
        </div>

        {solicitacoes.length === 0 ? (
          <div className="vazio">
            <IoNotificationsOutline className="vazio-icone" />
            <p>Nenhuma solicitação pendente</p>
          </div>
        ) : (
          <div className="lista-solicitacoes">
            {solicitacoes.map((sol) => (
              <div key={sol.id_solicitacao} className={`card-solicitacao tipo-${sol.tipo}`}>

                <div className="card-header">
                  <span className={`badge-tipo ${sol.tipo}`}>
                    {sol.tipo === 'adicao' ? '＋ Adição' : '✎ Edição'}
                  </span>
                  {sol.tipo === 'edicao' && sol.id_filme && (
                    <span className="filme-id">Filme #{sol.id_filme}</span>
                  )}
                  <span className="usuario-info">
                    por <strong>{sol.apelido || sol.nome}</strong>
                    <small>({sol.email})</small>
                  </span>
                  <span className="data-sol">
                    {new Date(sol.criado_em).toLocaleString('pt-BR')}
                  </span>
                </div>

                <div className="card-dados">
                  {formatarDados(sol.dados)}
                </div>

                <div className="card-acoes">
                  <textarea
                    className="input-mensagem"
                    placeholder="Mensagem para o usuário (opcional)"
                    value={mensagens[sol.id_solicitacao] || ''}
                    onChange={(e) => setMensagens(prev => ({
                      ...prev,
                      [sol.id_solicitacao]: e.target.value
                    }))}
                    rows={2}
                  />
                  <div className="botoes-resposta">
                    <button
                      className="btn-reprovar"
                      onClick={() => responder(sol.id_solicitacao, 'reprovada')}
                      disabled={processando === sol.id_solicitacao}
                    >
                      <IoCloseCircle />
                      Reprovar
                    </button>
                    <button
                      className="btn-aprovar"
                      onClick={() => responder(sol.id_solicitacao, 'aprovada')}
                      disabled={processando === sol.id_solicitacao}
                    >
                      <IoCheckmarkCircle />
                      Aprovar
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </section>

      <section className="notificacoes-bottom"></section>

    </main>
  )
}

export default Notificacoes
import { useState, useEffect, useCallback } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  const buscar = useCallback(() => {
    setLoading(true)
    setErro(null)

    let tentativas = 0
    const maxTentativas = 8

    const tentar = () => {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setData(data)
          setLoading(false)
        })
        .catch(err => {
          tentativas++
          if (tentativas < maxTentativas) {
            console.warn(`Backend ainda não disponível, tentando novamente... (${tentativas}/${maxTentativas})`)
            setTimeout(tentar, 2000)
          } else {
            setErro('Não foi possível conectar ao servidor.')
            setLoading(false)
          }
        })
    }

    tentar()
  }, [url])

  useEffect(() => {
    buscar()
  }, [buscar])

  return { data, loading, erro, refetch: buscar }
}
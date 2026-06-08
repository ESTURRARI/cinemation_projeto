import './home.css'

import carrossel1 from '../../assets/carrossel/carrossel1.png'
import carrossel2 from '../../assets/carrossel/carrossel2.png'
import carrossel3 from '../../assets/carrossel/carrossel3.png'
import carrossel4 from '../../assets/carrossel/carrossel4.png'

import venom from '../../assets/posters/venom.png'
import black from '../../assets/posters/black.png'
import urso from '../../assets/posters/urso.png'
import ratatouille from '../../assets/posters/ratatouille.png'
import jujutsu from '../../assets/posters/jujutsu.png'
import noiva from '../../assets/posters/noiva.png'

import mufasa from '../../assets/posters/mufasa.png'
import demon from '../../assets/posters/demon.png'
import coraline from '../../assets/posters/coraline.png'
import deadpool from '../../assets/posters/deadpool.png'
import zootopia from '../../assets/posters/zootopia2.png'
import thor from '../../assets/posters/thor.png'

import CardFilme from '../../components/cardfilme/cardFilme'

function Home() {

  return (

    <main className="home">

      <section className="hero">

        <div className="slides">

          <img src={carrossel1} alt="" />
          <img src={carrossel2} alt="" />
          <img src={carrossel3} alt="" />
          <img src={carrossel4} alt="" />

        </div>

      </section>

      <section className="catalogo">

        <h2>Recomendações</h2>

        <div className="linha-filmes">

          <CardFilme
            id={1}
            imagem={venom}
            nome="Venom"
            ano="2018"
            genero="Ação"
            sinopse="Venom mostra a história de Eddie Brock, um jornalista que se une a um simbionte alienígena poderoso."
          />

          <CardFilme
            id={6}
            imagem={black}
            nome="Black Clover"
            ano="2017"
            genero="Fantasia"
            sinopse="Asta sonha em se tornar o Rei Mago mesmo sem possuir magia."
          />

          <CardFilme
            id={21}
            imagem={urso}
            nome="Irmão Urso"
            ano="2003"
            genero="Aventura"
            sinopse="Um jovem guerreiro é transformado em urso e aprende sobre amizade."
          />

          <CardFilme
            id={19}
            imagem={ratatouille}
            nome="Ratatouille"
            ano="2007"
            genero="Animação"
            sinopse="Um rato apaixonado por culinária sonha em se tornar chef."
          />

          <CardFilme
            id={14}
            imagem={jujutsu}
            nome="Jujutsu Kaisen"
            ano="2020"
            genero="Anime"
            sinopse="Yuji Itadori entra no mundo das maldições após engolir um objeto amaldiçoado."
          />

          <CardFilme
            id={18}
            imagem={noiva}
            nome="A Noiva Cadáver"
            ano="2005"
            genero="Fantasia"
            sinopse="Victor acidentalmente se casa com uma noiva do mundo dos mortos."
          />

        </div>

      </section>

      <section className="catalogo">

        <h2>Últimos lançamentos</h2>

        <div className="linha-filmes">

          <CardFilme
            id={17}
            imagem={mufasa}
            nome="Mufasa"
            ano="2024"
            genero="Animação"
            sinopse="A origem de Mufasa antes de se tornar o rei das Terras do Reino."
          />

          <CardFilme
            id={11}
            imagem={demon}
            nome="Demon Slayer"
            ano="2019"
            genero="Anime"
            sinopse="Tanjiro luta contra demônios enquanto tenta salvar sua irmã."
          />

          <CardFilme
            id={10}
            imagem={coraline}
            nome="Coraline"
            ano="2009"
            genero="Fantasia"
            sinopse="Uma garota encontra uma dimensão alternativa assustadora."
          />

          <CardFilme
            id={3}
            imagem={deadpool}
            nome="Deadpool"
            ano="2024"
            genero="Ação"
            sinopse="Deadpool retorna em uma aventura caótica e violenta."
          />

          <CardFilme
            id={25}
            imagem={zootopia}
            nome="Zootopia 2"
            ano="2025"
            genero="Animação"
            sinopse="Nick e Judy retornam para um novo caso em Zootopia."
          />

          <CardFilme
            id={2}
            imagem={thor}
            nome="Thor Ragnarok"
            ano="2017"
            genero="Ação"
            sinopse="Thor precisa impedir Ragnarok e salvar Asgard."
          />

        </div>

      </section>

      <section className="blue-glow"></section>

    </main>
  )
}

export default Home
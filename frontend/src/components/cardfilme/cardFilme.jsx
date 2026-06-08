import './cardFilme.css'

import { Link } from 'react-router-dom'

function CardFilme(props){

  return(

    <div className="card-filme">

      <img
        src={props.imagem}
        alt=""
      />

      <div className="card-overlay">

        <div className="info-filme">

          <h2>{props.nome}</h2>

          <p>
            <strong>Ano:</strong> {props.ano}
          </p>

          <p>
            <strong>Gênero:</strong> {props.genero}
          </p>

          <p className="sinopse">
            {props.sinopse}
          </p>

          <Link
            to={`/detalhes/${props.id}`}
            className="btn-vermais"
          >
            Ver mais
          </Link>

        </div>

      </div>

    </div>

  )
}

export default CardFilme
import './footer.css'

import { FaInstagram } from "react-icons/fa"
import { FaFacebookF } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"

function Footer() {

  return (

    <footer className="footer">

      <div className="footer-content">

        <div className="footer-logo">

          <h1>CINEMATION</h1>

          <p>
            Explore animações, filmes
            e universos incríveis.
          </p>

        </div>

        <div className="footer-section">

          <h2>Redes Sociais</h2>

          <div className="social-icons">

            <FaInstagram className="social-icon" />

            <FaFacebookF className="social-icon" />

            <FaTwitter className="social-icon" />

          </div>

        </div>

        <div className="footer-section">

          <h2>Contato</h2>

          <p>cinemation@cinemation.com</p>

          <p>(19) 99999-9999</p>

        </div>

        <div className="footer-section">

          <h2>Navegação</h2>

          <p>Home</p>

          <p>Filmes</p>

          <p>Favoritos</p>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 Cinemation. Todos os direitos reservados.
        </p>

      </div>

    </footer>

  )
}

export default Footer
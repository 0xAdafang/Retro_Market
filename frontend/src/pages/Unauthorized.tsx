import { Link } from 'react-router-dom';
import 'nes.css/css/nes.min.css';

export default function Unauthorized() {
  return (
    <div className="nes-container is-dark with-title" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <p className="title">Accès refusé</p>
      <p className="nes-text is-error">Veuillez vous connecter pour accéder à cette page.</p>
      <Link to="/login" className="nes-btn is-warning" style={{ marginTop: '1rem', display: 'inline-block' }}>
        Se connecter
      </Link>
    </div>
  );
}
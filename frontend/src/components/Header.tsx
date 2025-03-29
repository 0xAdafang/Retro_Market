import { ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'nes.css/css/nes.min.css';

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ email?: string; username?: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ email: payload.email, username: payload.username });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        console.warn('Token invalide');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <header
      className="nes-container is-dark"
      style={{
        marginBottom: '1rem',
        padding: '0.5rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '0.75rem',
        border: 'none',
        
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <img src="/logo.png" alt="Logo" style={{ width: '40px', height: '40px' }} />
        <h1 style={{ fontSize: '0.85rem' }}>Retro Market</h1>
      </div>
      <nav
        style={{
          display: 'flex',
          gap: '0.3rem',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginRight: '0.5rem'
        }}
      >
        <Link to="/" className="nes-btn is-primary" style={{ fontSize: '0.65rem' }}>Accueil</Link>
        {!user && (
          <>
            <Link to="/login" className="nes-btn" style={{ fontSize: '0.65rem' }}>Connexion</Link>
            <Link to="/register" className="nes-btn" style={{ fontSize: '0.65rem' }}>Inscription</Link>
          </>
        )}
        {user && (
          <>
            <Link to="/orders" className="nes-btn is-success" style={{ fontSize: '0.65rem' }}>Mes commandes</Link>
            <div className="nes-balloon from-left nes-pointer" style={{ margin: '0 4px', fontSize: '0.6rem' }}>
              {user.username || user.email}
            </div>
            <button onClick={handleLogout} className="nes-btn is-error" style={{ fontSize: '0.65rem' }}>Déconnexion</button>
          </>
        )}
        <Link to="/cart" className="nes-btn is-warning" style={{ fontSize: '0.65rem' }}>
          <ShoppingCart size={14} style={{ marginRight: '3px' }} />Panier
        </Link>
      </nav>
    </header>
  );
}

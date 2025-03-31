import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BurgerMenu from './BurgerMenu';
import 'nes.css/css/nes.min.css';

export default function Header() {
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
        <h1 className="glitch-header">Retro_Market</h1>
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
        <div className="nes-balloon from-left nes-pointer"
          style={{
            margin: '0 4px',
            fontSize: '0.6rem',
            color: '#222',
          }}>
          Bonjour, {user?.username || 'visiteur'}
        </div>
        <Link to="/cart" className="nes-btn is-warning" style={{ fontSize: '0.65rem' }}>
          <ShoppingCart size={14} style={{ marginRight: '3px' }} />Panier
        </Link>
        <BurgerMenu />
      </nav>
    </header>
  );
}

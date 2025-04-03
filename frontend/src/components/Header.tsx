import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BurgerMenu from './BurgerMenu';
import 'nes.css/css/nes.min.css';

export default function Header() {
  const [user, setUser] = useState<{ email?: string; username?: string } | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUser({ email: payload.email, username: payload.username });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          console.warn('Token invalide');
        }
      } else {
        setUser(null);
      }
    };
  
    const loadCartTotal = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (Array.isArray(cart)) {
        const sum = cart.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0);
        setTotal(sum);
      }
    };
  
    loadUser();
    loadCartTotal();
  
    const interval = setInterval(loadCartTotal, 1000); // vérifie toutes les 1 secondes
    window.addEventListener('authChange', loadUser);
  
    return () => {
      clearInterval(interval);
      window.removeEventListener('authChange', loadUser);
    };
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
        <img src="/logo.png" alt="Logo" style={{ width: '70px', height: '40px' }} />
        <h1 className="glitch-header">
          <Link to="/" className="glitch-link">Retro_Market</Link>
        </h1>
      </div>

      <nav
        style={{
          display: 'flex',
          gap: '0.3rem',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginRight: '0.5rem',
        }}
      >
        <div className="nes-field" style={{ marginRight: '0.75rem' }}>
          <label
            htmlFor="search_field"
            style={{
              fontSize: '0.65rem',
              color: '#fff',
              textAlign: 'center',
              display: 'block',
            }}
          >
            Rechercher
          </label>
          <input
            type="text"
            id="search_field"
            className="nes-input"
            style={{ fontSize: '0.8rem', width: '300px' }}
            placeholder="Un jeu rétro..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const query = (e.target as HTMLInputElement).value.trim();
                if (query.length > 0) {
                  window.location.href = `/onsale?search=${encodeURIComponent(query)}`;
                }
              }
            }}
          />
        </div>

        <div
          className="nes-balloon from-left nes-pointer"
          style={{ margin: '0 4px', fontSize: '0.6rem', color: '#222' }}
        >
          Bonjour, {user?.username || 'visiteur'}
        </div>

        <Link
  to="/cart"
  className="nes-btn is-warning"
  style={{
    fontSize: '0.65rem',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    minWidth: '110px',
    justifyContent: 'space-between',
  }}
>
  <ShoppingCart size={14} /> Panier
  {total > 0 && (
    <span style={{ fontSize: '0.7rem', color: '#fff', fontWeight: 'bold', marginLeft: '4px' }}>
      ({total.toFixed(2)} $)
    </span>
  )}
</Link>

        {user ? (
          <BurgerMenu />
        ) : (
          <>
            <Link to="/login" className="nes-btn is-success" style={{ fontSize: '0.65rem' }}>
              Connexion
            </Link>
            <Link to="/register" className="nes-btn is-primary" style={{ fontSize: '0.65rem' }}>
              Inscription
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

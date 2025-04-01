import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'nes.css/css/nes.min.css';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  img: string;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:3001/api/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Erreur serveur (${res.status}): ${errorText}`);
        }
        return res.json();
      })
      .then(data => setItems(data))
      .catch(err => {
        toast.error('Erreur de chargement du panier');
        console.error("❌ Erreur panier :", err);
      });
  }, []);

  const removeItem = async (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3001/api/cart/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      setItems((prev) => prev.filter(item => item.id !== id));
      toast.success('Article retiré du panier');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const total = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  return (
    <div className="cart-wrapper">
      <div className="cart-box nes-container is-rounded with-title">
        <p className="title cart-title">Mon Panier</p>
  
        {items.length === 0 ? (
          <p className="nes-text is-warning">Votre panier est vide.</p>
        ) : (
          <>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {items.map((item) => (
                <li
                  key={item.id}
                  className="nes-container is-rounded cart-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                      imageRendering: 'pixelated',
                    }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <h3>{item.title}</h3>
                    <p>{Number(item.price).toFixed(2)} $</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="nes-btn is-error"
                  >
                    ✘
                  </button>
                </li>
              ))}
            </ul>
  
            <div style={{ marginTop: '1rem', textAlign: 'right' }}>
              <p className="nes-text">Total : {total.toFixed(2)} $</p>
              <button
                className="nes-btn is-primary"
                style={{ marginTop: '1rem' }}
                onClick={() => navigate('/checkout')}
              >
                Valider ma commande
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
  
}

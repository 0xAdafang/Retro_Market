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

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:3001/api/cart', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Erreur de chargement du panier');
        setLoading(false);
      });
  }, []);

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) throw new Error('Erreur lors de la commande');

      toast.success('Commande validée avec succès !');
      navigate('/');
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const TPS = total * 0.05;
  const TVQ = total * 0.09975;
  const totalAvecTaxes = total + TPS + TVQ;

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="cart-wrapper">
      <div className="cart-box nes-container is-rounded with-title">
        <p className="title cart-title">Valider la commande</p>
  
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
                    <p>
                      {Number(item.price).toFixed(2)} $ x {item.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
  
            <div style={{ marginTop: '1rem', textAlign: 'right' }}>
              <p className="nes-text">Sous-total : {total.toFixed(2)} $</p>
              <p className="nes-text">TPS (5%) : {TPS.toFixed(2)} $</p>
              <p className="nes-text">TVQ (9.975%) : {TVQ.toFixed(2)} $</p>
              <p className="nes-text is-primary">
                <strong>Total TTC : {totalAvecTaxes.toFixed(2)} $</strong>
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '1rem',
                }}
              >
                <button className="nes-btn" onClick={() => navigate('/cart')}>
                  ← Retour au panier
                </button>
                <button className="nes-btn is-success" onClick={handleCheckout}>
                  Payer
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

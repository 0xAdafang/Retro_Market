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

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="nes-container with-title is-dark" style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <p className="title">Valider la commande</p>
      {items.length === 0 ? (
        <p className="nes-text is-warning">Votre panier est vide.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {items.map(item => (
              <li key={item.id} className="nes-container is-rounded" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={item.img} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                <div style={{ flexGrow: 1 }}>
                  <h3>{item.title}</h3>
                  <p>{item.price.toFixed(2)} € x {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="nes-text is-primary" style={{ marginTop: '1rem', textAlign: 'right' }}>
            Total : {total.toFixed(2)} €
          </p>
          <button className="nes-btn is-success" onClick={handleCheckout} style={{ marginTop: '1rem' }}>Payer</button>
        </>
      )}
    </div>
  );
}

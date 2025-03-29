import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:3001/api/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => {
        toast.error('Erreur de chargement du panier');
        console.error(err);
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

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="nes-container with-title is-dark" style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <p className="title">Mon Panier</p>
      {items.length === 0 ? (
        <p className="nes-text is-warning">Votre panier est vide.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map(item => (
            <li key={item.id} className="nes-container is-rounded" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img src={item.img} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
              <div style={{ flexGrow: 1 }}>
                <h3>{item.title}</h3>
                <p>{item.price.toFixed(2)} €</p>
              </div>
              <button onClick={() => removeItem(item.id)} className="nes-btn is-error">🗑️</button>
            </li>
          ))}
        </ul>
      )}
      <p className="nes-text is-primary" style={{ marginTop: '1rem', textAlign: 'right' }}>Total : {total.toFixed(2)} €</p>
    </div>
  );
}

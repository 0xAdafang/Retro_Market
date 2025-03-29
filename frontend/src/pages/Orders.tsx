import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'nes.css/css/nes.min.css';

interface Order {
  _id: string;
  createdAt: string;
  total: number;
  products: { title: string; price: number; img: string }[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:3001/api/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch((err) => {
        toast.error('Erreur de chargement des commandes');
        console.error(err);
      });
  }, []);

  return (
    <div className="nes-container is-dark with-title" style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <p className="title">Mes Commandes</p>
      {orders.length === 0 ? (
        <p className="nes-text is-warning">Aucune commande trouvée.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {orders.map(order => (
            <li key={order._id} className="nes-container is-rounded">
              <Link to={`/orders/${order._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>Commande du {new Date(order.createdAt).toLocaleDateString()}</h3>
                <p className="nes-text is-success">Total : {order.total.toFixed(2)} €</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                  {order.products.map((p, idx) => (
                    <div key={idx} className="nes-container is-rounded" style={{ width: '120px', textAlign: 'center' }}>
                      <img src={p.img} alt={p.title} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                      <p>{p.title}</p>
                      <p>{p.price.toFixed(2)} €</p>
                    </div>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

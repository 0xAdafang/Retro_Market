import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'nes.css/css/nes.min.css';

interface Order {
  _id: string;
  createdAt: string;
  total: number;
  products: { title: string; price: number; img: string }[];
}

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || !id) return;

    fetch(`http://localhost:3001/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setOrder(data))
      .catch(() => {
        toast.error('Erreur de chargement de la commande');
      });
  }, [id]);

  if (!order) return <p>Chargement...</p>;

  return (
    <div className="nes-container is-dark with-title" style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <p className="title">Détail Commande</p>
      <p className="nes-text is-primary">Commande #{order._id}</p>
      <p className="nes-text">Date : {new Date(order.createdAt).toLocaleDateString()}</p>
      <p className="nes-text">Total : {order.total.toFixed(2)} €</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {order.products.map((p, idx) => (
          <div key={idx} className="nes-container is-rounded" style={{ width: '150px', textAlign: 'center' }}>
            <img src={p.img} alt={p.title} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
            <p>{p.title}</p>
            <p className="nes-text is-success">{p.price.toFixed(2)} €</p>
          </div>
        ))}
      </div>
    </div>
  );
}

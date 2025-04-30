import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import groschat from '../assets/groschat.gif';
import 'nes.css/css/nes.min.css';

interface ProductInOrder {
  _id: string;
  title: string;
  price: number;
  img: string;
}

interface Order {
  _id: string;
  createdAt: string;
  total: number;
  products: ProductInOrder[];
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
      .then(data => {
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.warn('⚠️ Données inattendues :', data);
          setOrders([]);
        }
      })
      .catch((err) => {
        toast.error('Erreur de chargement des commandes');
        console.error(err);
      });
  }, []);

  const calculateTaxes = (subtotal: number) => {
    const tps = subtotal * 0.05;
    const tvq = subtotal * 0.09975;
    return {
      tps,
      tvq,
      totalWithTaxes: subtotal + tps + tvq,
    };
  };

  return (
    <div
      style={{
        backgroundImage: `url(${groschat})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <div
        className="nes-container is-dark with-title"
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          backgroundColor: 'rgba(25, 25, 25, 0.9)',
        }}
      >
        <p className="title">Mes Commandes</p>
        {orders.length === 0 ? (
          <p className="nes-text is-warning">Aucune commande trouvée.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {orders.map(order => {
              if (typeof order.total !== "number") return null;

              const { tps, tvq, totalWithTaxes } = calculateTaxes(order.total);

              return (
                <li key={order._id} className="nes-container is-rounded" style={{ backgroundColor: '#fff' }}>
                  <Link to={`/orders/${order._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className="nes-text is-primary" style={{ marginBottom: '0.5rem' }}>
                      📦 Commande du {new Date(order.createdAt).toLocaleDateString()}
                    </h3>
                    <progress className="nes-progress is-pattern" value="50" max="100" style={{ width: '100%' }}></progress>
                    <p style={{ fontSize: '0.9rem', color: '#333', marginTop: '0.5rem' }}>
                      Sous-total : <strong>{order.total.toFixed(2)} $</strong><br />
                      TPS (5%) : {tps.toFixed(2)} $ | TVQ (9.975%) : {tvq.toFixed(2)} $<br />
                      <strong className="nes-text is-success">
                        Total avec taxes : {totalWithTaxes.toFixed(2)} $
                      </strong>
                    </p>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      marginTop: '1rem',
                      justifyContent: 'flex-start'
                    }}>
                      {order.products.map((p) => (
                        <div
                          key={p._id || p.title}
                          className="nes-container is-rounded"
                          style={{
                            width: '160px',
                            textAlign: 'center',
                            backgroundColor: '#e6e6e6',
                            padding: '1rem',
                            boxShadow: '2px 2px 0px #888'
                          }}
                        >
                          <img
                            src={p.img}
                            alt={p.title}
                            style={{
                              width: '90px',
                              height: '90px',
                              objectFit: 'contain',
                              marginBottom: '0.5rem',
                              borderRadius: '4px'
                            }}
                          />
                          <p style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#000' }}>{p.title}</p>
                          <p style={{ fontSize: '0.8rem', color: '#444' }}>{p.price.toFixed(2)} $</p>
                        </div>
                      ))}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

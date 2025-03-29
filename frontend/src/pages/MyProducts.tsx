import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  created_at: string;
}

export default function MyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/my-products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Erreur');
        setProducts(data);
      } catch (err) {
        toast.error((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="nes-container with-title is-centered" style={{ maxWidth: 800, margin: '2rem auto' }}>
      <p className="title">Mes Produits</p>
      {loading ? (
        <p>Chargement...</p>
      ) : products.length === 0 ? (
        <p className="nes-text is-warning">Aucun produit mis en vente</p>
      ) : (
        <div className="products-grid">
          {products.map((p) => (
            <div key={p.id} className="nes-container is-rounded" style={{ marginBottom: '1rem' }}>
              <img src={p.image} alt={p.title} style={{ width: '100%', maxHeight: '180px', objectFit: 'cover' }} />
              <h3>{p.title}</h3>
              <p>{p.price.toFixed(2)} $</p>
              <p style={{ fontSize: '0.6rem' }}>{new Date(p.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

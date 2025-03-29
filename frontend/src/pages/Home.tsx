import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import 'nes.css/css/nes.min.css';
import '../index.css';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category?: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Erreur API');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Impossible de charger les produits.');
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="nes-text is-primary" style={{ textAlign: 'center', margin: '2rem' }}>Chargement...</p>;
  }

  if (error) {
    return <p className="nes-text is-error" style={{ textAlign: 'center', margin: '2rem' }}>{error}</p>;
  }

  return (
    <section
      style={{
        padding: '2rem 1rem',
        backgroundColor: 'white',
        textAlign: 'center',
        overflow: 'hidden',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <h2 style={{ marginBottom: '2rem', color: '#111' }}>Annonces du jour</h2>
      <div className="home-marquee">
        {products.map(product => (
          <div className="home-marquee-item" key={product.id}>
            <ProductCard product={{ ...product, img: product.image }} />
          </div>
        ))}
      </div>
    </section>
  );
}

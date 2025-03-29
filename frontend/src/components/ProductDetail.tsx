import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'nes.css/css/nes.min.css';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category?: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => {
        console.log('API status:', res.status);
        if (!res.ok) throw new Error('Produit non trouvé');
        return res.json();
      })
      .then(data => {
        console.log('Produit récupéré :', data);
        setProduct(data);
      })
      .catch(err => {
        console.error('Erreur chargement produit', err);
      });
  }, [id]);

  if (!product) return <p className="nes-text is-primary" style={{ textAlign: 'center', margin: '2rem' }}>Chargement...</p>;
  
  return (
    <section
      style={{
        background: 'white',
        maxWidth: '900px',
        margin: '2rem auto',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        textAlign: 'center',
      }}
      className="nes-container is-rounded"
    >
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: '100%',
          maxWidth: '400px',
          height: 'auto',
          objectFit: 'contain',
          borderRadius: '12px',
          marginBottom: '1rem',
        }}
      />
      <h2 style={{ fontSize: '1rem', color: '#111' }}>{product.title}</h2>
      <p className="nes-text is-success" style={{ margin: '0.5rem 0' }}>
      {Number(product.price).toFixed(2)} $
      </p>
      <p style={{ fontSize: '0.75rem', color: '#333', opacity: 0.8 }}>
        {product.description}
      </p>
      <Link to="/" className="nes-btn is-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
        Retour à l'accueil
      </Link>
    </section>
  );
}


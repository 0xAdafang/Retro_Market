import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'nes.css/css/nes.min.css';
import '../index.css';

interface Product {
  user_id: number;
  username: string;
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  console.log("Contenu du panier :", JSON.parse(localStorage.getItem("cart") || "[]"));

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Produit non trouvé');
        return res.json();
      })
      .then(data => {
        setProduct(data);
      })
      .catch(err => {
        console.error('Erreur chargement produit', err);
      });
  }, [id]);

  async function handleAddToCart(productId: number) {
    if (product?.user_id === currentUser?.id) {
      setMessage("⚠️ Vous ne pouvez pas ajouter votre propre produit.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/cart/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) throw new Error('Erreur ajout au panier');
      const data = await res.json();
      setMessage('Produit ajouté au panier !');
      console.log('Produit ajouté :', data);
    } catch (err) {
      console.error(err);
      setMessage('❌ Erreur lors de l’ajout au panier.');
    }
  }

  if (!product)
    return (
      <p className="nes-text is-primary" style={{ textAlign: 'center', margin: '2rem' }}>
        Chargement...
      </p>
    );

  return (
    <section className="product-detail-wrapper">
      <div className="nes-container is-rounded product-detail-container">
        <div className="product-detail-content">
          <img
            src={product.image}
            alt={product.title}
            className="product-detail-image"
          />
          <div className="product-detail-info">
            <h2 className="nes-text is-primary product-title">{product.title}</h2>
            <div style={{ marginBottom: '1rem' }}>
              <span className="nes-badge is-primary">
                <span className="is-dark">NEUF</span>
              </span>
              <span className="nes-badge is-success" style={{ marginLeft: '0.5rem' }}>
                <span className="is-dark">DISPONIBLE</span>
              </span>
            </div>
            <p className="nes-text is-success product-price">
              {Number(product.price).toFixed(2)} $
            </p>
            <p className="product-description">{product.description}</p>
            <p className="product-seller">
              Vendu par :{' '}
              <Link to={`/vendeur/${product.user_id}`} className="seller-link">
                <strong>{product.username || 'Utilisateur inconnu'}</strong>
              </Link>
            </p>

            {product.user_id !== currentUser?.id && (
              <button
                className="nes-btn is-success"
                style={{ marginTop: '1rem' }}
                onClick={() => handleAddToCart(product.id)}
              >
                Ajouter au panier
              </button>
            )}

            {message && (
              <p className="nes-text" style={{ marginTop: '1rem' }}>
                {message}
              </p>
            )}

            <Link
              to="/onsale"
              className="nes-btn is-primary"
              style={{ marginTop: '1rem', display: 'inline-block' }}
            >
              Retour
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

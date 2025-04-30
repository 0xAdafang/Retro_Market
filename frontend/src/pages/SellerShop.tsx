import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "nes.css/css/nes.min.css";
import "../index.css";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  username: string;
}

export default function SellerShop() {
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sellerName, setSellerName] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/products/seller/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement");
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        if (data.length > 0) {
          setSellerName(data[0].username);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger les produits du vendeur");
        setLoading(false);
      });
  }, [id]);

  return (
    <main className="seller-shop-layout">
      <h2
        style={{
          fontSize: '2rem',
          marginTop: '3rem',
          marginBottom: '1rem',
          color: '#000',
          textAlign: 'center',
        }}
      >
        Boutique de {sellerName || "inconnu"}
      </h2>

      {loading && <p className="nes-text is-primary">Chargement...</p>}
      {error && <p className="nes-text is-error">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="nes-text is-warning">
          Ce vendeur n'a encore rien mis en vente.
        </p>
      )}

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={{ ...product, img: product.image }}
          />
        ))}
      </div>
    </main>
  );
}

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "nes.css/css/nes.min.css";
import "../index.css";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category?: string;
}

export default function OnSale() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Erreur chargement produits:", err));
  }, []);

  const handleSort = (value: string) => {
    setSort(value);
    const sorted = [...products];
    switch (value) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    setProducts(sorted);
  };

  return (
    <main className="onsale-container">
      <h1 className="glitch-title onsale-title">
        Produits en vente
      </h1>

      <div className="nes-container is-rounded is-dark sort-bar">
        <label htmlFor="sort">Trier par :</label>
        <div className="nes-select">
          <select id="sort" value={sort} onChange={(e) => handleSort(e.target.value)}>
            <option value="">-- Choisir --</option>
            <option value="price-asc">Prix : Bas → Haut</option>
            <option value="price-desc">Prix : Haut → Bas</option>
            <option value="title-asc">Titre : A → Z</option>
            <option value="title-desc">Titre : Z → A</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card-wrapper" key={product.id}>
            <ProductCard product={{ ...product, img: product.image }} />
          </div>
        ))}
      </div>
    </main>
  );
}

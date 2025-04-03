import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "nes.css/css/nes.min.css";
import "../index.css";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  userId: number;
  category?: string;
}

export default function OnSale() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<string>("");
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

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

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce produit ?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success("Produit supprimé !");
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        toast.error("Erreur lors de la suppression");
      }
    } catch (err) {
      console.error("Suppression échouée :", err);
      toast.error("Erreur serveur");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );

  return (
    <main className="onsale-container">
      <h1 className="glitch-title onsale-title">Produits en vente</h1>

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
        {filteredProducts.map((product) => (
          <div className="product-card-wrapper" key={product.id}>
            <ProductCard product={{ ...product, img: product.image }} />

            {user?.id === product.userId && (
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                <button
                  className="nes-btn is-warning"
                  onClick={() => navigate(`/edit/${product.id}`)}
                >
                  Modifier
                </button>
                <button
                  className="nes-btn is-error"
                  onClick={() => handleDelete(product.id)}
                >
                  Supprimer
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

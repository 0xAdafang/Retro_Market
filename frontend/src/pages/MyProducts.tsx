import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
import "nes.css/css/nes.min.css";
import "../index.css";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  user_id: number;
  category?: string;
  username?: string;
}

const backgrounds: { [key: string]: string } = {
  castle: "https://res.cloudinary.com/dpahd7i2c/image/upload/v1743637148/wallpapersden.com_fantasy-castle-pixel-art_1920x1081_nqmqgh.jpg",
  cyber: "https://res.cloudinary.com/dpahd7i2c/image/upload/v1743637147/wp5524421_td8kbm.webp",
  warrior: "https://res.cloudinary.com/dpahd7i2c/image/upload/v1743639111/animated-dark-souls-solaire-of-astora-0bimjjj9vy24y4sb_gmewpe.jpg",
  sprite: "https://res.cloudinary.com/dpahd7i2c/image/upload/v1743638146/wp4787606_ynngig.jpg",
  pokemon: "https://res.cloudinary.com/dpahd7i2c/image/upload/v1743639045/wp4163531-2521789432_at9jan.jpg",
  game: "https://res.cloudinary.com/dpahd7i2c/image/upload/v1743638146/retro-gaming-02-3671288710_mlha0c.jpg",
};

export default function MyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedBg, setSelectedBg] = useState<string>("castle");
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!user?.id) {
      toast.error("Utilisateur non connecté");
      return;
    }

    fetch(`/api/products/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          toast.error("Erreur de chargement : données invalides");
          setProducts([]);
        }
      })
      .catch(() => toast.error("Erreur chargement de vos produits"));
  }, [user]);

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
    } catch {
      toast.error("Erreur serveur");
    }
  };

  return (
    <main
      className="onsale-container"
      style={{
        backgroundImage: `url(${backgrounds[selectedBg]})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <h1 className="onsale-title" style={{ textAlign: "center", color: "#fff", marginBottom: "1rem" }}>
        Mes Produits
      </h1>

      <div className="nes-field is-inline" style={{ width: "400px", margin: "0 auto", marginBottom: "2rem" }}>
        <label htmlFor="bgSelect" style={{ color: "#fff" }}> Changer le fond</label>
        <div className="nes-select">
          <select
            id="bgSelect"
            value={selectedBg}
            onChange={(e) => setSelectedBg(e.target.value)}
            style={{ width: "100%" }}
          >
            <option value="castle">🏰 Château</option>
            <option value="cyber">🧪 Cyber</option>
            <option value="warrior">⚔️ Guerrier</option>
            <option value="sprite">🧃 Sprite</option>
            <option value="pokemon">🔴 Pokémon</option>
            <option value="game">🕹️ Game</option>
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <p style={{ textAlign: "center", color: "#fff", marginTop: "2rem" }}>
          Aucun produit trouvé. 🕹️
        </p>
      ) : (
        <div className="my-products-grid">
          {products.map((product) => (
            <div className="product-card-wrapper" key={product.id}>
              <ProductCard product={{ ...product, img: product.image }} />
              <div className="product-action-buttons">
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
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

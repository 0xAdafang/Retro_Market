import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "nes.css/css/nes.min.css";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    image: "",
    category: "",
  });

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => toast.error("Erreur chargement produit"));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        toast.success("Produit mis à jour !");
        navigate("/onsale");
      } else {
        toast.error("Erreur lors de la mise à jour");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Erreur serveur");
    }
  };

  return (
    <main
      className="nes-container is-rounded"
      style={{ maxWidth: "600px", margin: "3rem auto", background: "#f0f0f0" }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Modifier le produit</h2>

      <form onSubmit={handleSubmit}>
        <div className="nes-field">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            name="title"
            className="nes-input"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="nes-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="nes-textarea"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="nes-field">
          <label htmlFor="price">Prix</label>
          <input
            type="number"
            id="price"
            name="price"
            className="nes-input"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="nes-field">
          <label htmlFor="image">Image (URL)</label>
          <input
            type="text"
            id="image"
            name="image"
            className="nes-input"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className="nes-field">
          <label htmlFor="category">Catégorie</label>
          <input
            type="text"
            id="category"
            name="category"
            className="nes-input"
            value={product.category}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="nes-btn is-primary" style={{ marginTop: "1rem" }}>
          Sauvegarder
        </button>
      </form>
    </main>
  );
}

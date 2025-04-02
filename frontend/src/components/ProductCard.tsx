import { Link } from "react-router-dom";
import "nes.css/css/nes.min.css";

export default function ProductCard({
  product,
}: {
  product: { id: number; title: string; price: number; img: string };
}) {
  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
      <div
        className="nes-container is-rounded product-card"
        style={{
          width: 180,
          height: 230,
          padding: "1rem",
          background: "#fff",
          transition: "transform 0.4s ease, boxShadow 0.4s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <img
          src={product.img}
          alt={product.title}
          style={{ width: "100%", height: 100, objectFit: "contain" }}
        />

        <div style={{ width: "100%", overflow: "hidden" }}>
          <h4
             title={product.title}
             className="product-title"
             style={{
               fontSize: "0.7rem",
               margin: "0.5rem 0 0.6rem",
               color: "#111",
               whiteSpace: "normal",
               overflowWrap: "break-word",
               wordBreak: "break-word",
               maxHeight: "2.5em", 
               lineHeight: "1.2",
             }}
          >
            {product.title}
          </h4>
          <p style={{ fontSize: "0.75rem", color: "#2e2e2e", margin: 0 }}>
            {Number(product.price).toFixed(2)} $
          </p>
        </div>
      </div>
    </Link>
  );
}

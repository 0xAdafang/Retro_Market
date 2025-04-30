import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "nes.css/css/nes.min.css";
import "../index.css";
import pixelBackground from "../assets/tokutei.gif";
import avatarKevin from "../assets/chatKevin.jpg";
import avatarDjamel from "../assets/chat2.jpg";
import avatarGenania from "../assets/chat1.png";
import avatarTerence from "../assets/chatTerence.jpg";
import waveBackground from "../assets/wave.gif";

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
  const navigate = useNavigate();
  const [isScrolling, setIsScrolling] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const toggleScroll = (value: boolean) => {
    setIsScrolling(value);
  };

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur API");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Impossible de charger les produits.");
        console.error(err);
        setLoading(false);
      });
  }, []);
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const translateX = ((mousePos.x / window.innerWidth) - 0.5) * 30;
  const translateY = ((mousePos.y / window.innerHeight) - 0.5) * 30;
  if (loading) {
    return (
      <p
        className="nes-text is-primary"
        style={{ textAlign: "center", margin: "2rem" }}
      >
        Chargement...
      </p>
    );
  }

  if (error) {
    return (
      <p
        className="nes-text is-error"
        style={{ textAlign: "center", margin: "2rem" }}
      >
        {error}
      </p>
    );
  }

  return (
    <main className="home-layout">
    <section
      className="hero-section"
      onMouseMove={handleMouseMove}
      style={{
        backgroundImage: `url(${pixelBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          transform: `translate(${-translateX}px, ${-translateY}px)`,
          transition: 'transform 0.1s linear'
        }}
      >
        <h1 className="glitch-title">Achète, Revends, Collectionne</h1>
        <p className="hero-subtitle">▼ En un clic ▼</p>

        <div className="home-buttons">
          <button className="nes-btn" onClick={() => navigate("/onsale")}>Acheter</button>
          <button className="nes-btn is-warning" onClick={() => navigate("new-product")}>Vendre</button>
        </div>
      </div>

      <div className="scroll-arrow">&#x25BC;</div>
    </section>


      <section className="products-section">
        <h2 className="nes-text is-dark" style={{ marginBottom: '1rem' }}>Nos Offres</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          <button className="nes-btn is-primary" onClick={() => toggleScroll(true)}>▶ Play</button>
          <button className="nes-btn is-error" onClick={() => toggleScroll(false)}>⏸ Stop</button>
        </div>

        <div className="home-marquee">
          <div className={`home-marquee-track ${isScrolling ? '' : 'paused'}`}>
            {[...products, ...products].map((product, index) => (
              <div className="home-marquee-item" key={`scroll-${product.id}-${index}`}>
                <ProductCard product={{ ...product, img: product.image }} />
              </div>
            ))}
          </div>
        </div>

        <div className="home-marquee">
          <div className={`home-marquee-track reverse-track ${isScrolling ? '' : 'paused'}`}>
            {[...products, ...products].reverse().map((product, index) => (
              <div className="home-marquee-item" key={`rev-${product.id}-${index}`}>
                <ProductCard product={{ ...product, img: product.image }} />
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-arrow">&#x25BC;</div>
      </section>

      <section className="nostalgia-zone">
        <div className="orbit-group">
          <div className="orbit-container orbit-left orbit-radius-1">
            <div className="orbit-item orbit-1">
              <i className="nes-mario"></i>
            </div>
            <div className="orbit-item orbit-2">
              <i className="nes-bulbasaur"></i>
            </div>
            <div className="orbit-item orbit-3">
              <i className="nes-kirby"></i>
            </div>
            <div className="orbit-item orbit-4">
              <i className="nes-charmander"></i>
            </div>
            <div className="orbit-item orbit-5">
              <i className="nes-squirtle"></i>
            </div>
            <div className="orbit-item orbit-6">
              <i className="nes-ash"></i>
            </div>
            <div className="orbit-item orbit-7">
              <i className="nes-icon trophy is-large"></i>
            </div>
            <div className="orbit-item orbit-8">
              <i className="nes-icon coin is-large"></i>
            </div>
          </div>

          <div className="orbit-container orbit-right orbit-radius-2">
            <div className="orbit-item orbit-1">
              <i className="nes-charmander"></i>
            </div>
            <div className="orbit-item orbit-2">
              <i className="nes-squirtle"></i>
            </div>
            <div className="orbit-item orbit-3">
              <i className="nes-ash"></i>
            </div>
            <div className="orbit-item orbit-4">
              <i className="nes-icon trophy is-large"></i>
            </div>
            <div className="orbit-item orbit-5">
              <i className="nes-pokeball"></i>
            </div>
            <div className="orbit-item orbit-6">
              <i className="nes-icon close is-large"></i>
            </div>
            <div className="orbit-item orbit-7">
              <i className="nes-mario"></i>
            </div>
            <div className="orbit-item orbit-8">
              <i className="nes-bulbasaur"></i>
            </div>
          </div>

          <div className="orbit-container orbit-left orbit-radius-3">
            <div className="orbit-item orbit-1">
              <i className="nes-charmander"></i>
            </div>
            <div className="orbit-item orbit-2">
              <i className="nes-squirtle"></i>
            </div>
            <div className="orbit-item orbit-3">
              <i className="nes-ash"></i>
            </div>
            <div className="orbit-item orbit-4">
              <i className="nes-icon trophy is-large"></i>
            </div>
            <div className="orbit-item orbit-5">
              <i className="nes-pokeball"></i>
            </div>
            <div className="orbit-item orbit-6">
              <i className="nes-icon close is-large"></i>
            </div>
            <div className="orbit-item orbit-7">
              <i className="nes-mario"></i>
            </div>
            <div className="orbit-item orbit-8">
              <i className="nes-bulbasaur"></i>
            </div>
          </div>

          <h2 className="nes-text is-primary">Ravivez la nostalgie</h2>
          <h2 className="nes-text is-primary">Dépensez sans compter !</h2>
        </div>
      </section>
      <section
        className="team-section"
        style={{
          backgroundImage: `url(${waveBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}
      >
        <h2 className="team-title-arcade">
          {Array.from("Notre Équipe").map((char, index) => (
            char === ' '
              ? <span key={index} style={{ width: '0.6rem' }}>{'\u00A0'}</span>
              : <span key={index} className={`arcade-char glitch-${(index % 5) + 1}`}>
                  {char}
                </span>
          ))}
        </h2>

        <div className="team-grid">
          <div className="nes-container is-dark with-title team-member">
            <img src={avatarKevin} alt="Kevin" className="team-avatar" />
            <div>
              <p className="title">Kevin Espinoza</p>
              <p>Scrum Master</p>
              <a
                href="https://github.com/kevin"
                target="_blank"
                rel="noreferrer"
              >
                <i className="nes-icon github is-medium"></i>
              </a>
            </div>
          </div>

          <div className="nes-container is-dark with-title team-member">
            <img src={avatarDjamel} alt="Djamel" className="team-avatar" />
            <div>
              <p className="title">Djamel Nait Sidenas</p>
              <p>Développeur Web</p>
              <a
                href="https://github.com/djamel"
                target="_blank"
                rel="noreferrer"
              >
                <i className="nes-icon github is-medium"></i>
              </a>
            </div>
          </div>

          <div className="nes-container is-dark with-title team-member">
            <img src={avatarGenania} alt="Genania" className="team-avatar" />
            <div>
              <p className="title">Genania Obas</p>
              <p>Développeuse Web</p>
              <a
                href="https://github.com/genania"
                target="_blank"
                rel="noreferrer"
              >
                <i className="nes-icon github is-medium"></i>
              </a>
            </div>
          </div>

          <div className="nes-container is-dark with-title team-member">
            <img src={avatarTerence} alt="Terence" className="team-avatar" />
            <div>
              <p className="title">Terence Sionneau</p>
              <p>Développeur Web</p>
              <a
                href="https://github.com/terence"
                target="_blank"
                rel="noreferrer"
              >
                <i className="nes-icon github is-medium"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

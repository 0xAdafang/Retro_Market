import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import 'nes.css/css/nes.min.css';
import '../index.css';
import pixelBackground from '../assets/tokutei.gif';
import avatarKevin from '../assets/chatKevin.jpg';
import avatarDjamel from '../assets/chat2.jpg';
import avatarGenania from '../assets/chat1.png';
import avatarTerence from '../assets/chatTerence.jpg';

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
    <main className="home-layout">
      {/* 🎮 Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${pixelBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <h1 className="glitch-title">Retro Market</h1>
        <p className="hero-subtitle">La marketplace du jeu vidéo rétro</p>

        <div className="home-buttons">
          <button className="nes-btn is-success" onClick={() => navigate('/')}>Acheter</button>
          <button className="nes-btn is-warning" onClick={() => navigate('/new')}>Vendre</button>
        </div>

        <div className="scroll-arrow">&#x25BC;</div>
      </section>

      {/* 🎮 Produits */}
      <section className="products-section">
        <h2 className="nes-text is-dark" style={{ marginBottom: '1rem' }}>Nos Offres</h2>

        {/* 1er défilement */}
        <div className="home-marquee">
          <div className="home-marquee-track">
            {[...products, ...products].map(product => (
              <div className="home-marquee-item" key={`main-${product.id}-${Math.random()}`}>
                <ProductCard product={{ ...product, img: product.image }} />
              </div>
            ))}
          </div>
        </div>

        {/* 2e défilement inversé */}
        <div className="home-marquee">
          <div className="home-marquee-track reverse-track">
            {[...products, ...products].map(product => (
              <div className="home-marquee-item" key={`rev-${product.id}-${Math.random()}`}>
                <ProductCard product={{ ...product, img: product.image }} />
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-arrow">&#x25BC;</div>
      </section>

      {/* ✨ Nostalgie */}
      <section className="nostalgia-zone">
        <div className="orbit-group">
          <div className="orbit-container orbit-left orbit-radius-1">
            <div className="orbit-item orbit-1"><i className="nes-mario"></i></div>
            <div className="orbit-item orbit-2"><i className="nes-bulbasaur"></i></div>
            <div className="orbit-item orbit-3"><i className="nes-kirby"></i></div>
            <div className="orbit-item orbit-4"><i className="nes-charmander"></i></div>
            <div className="orbit-item orbit-5"><i className="nes-squirtle"></i></div>
            <div className="orbit-item orbit-6"><i className="nes-ash"></i></div>
            <div className="orbit-item orbit-7"><i className="nes-icon trophy is-large"></i></div>
            <div className="orbit-item orbit-8"><i className="nes-icon coin is-large"></i></div>
          </div>

          <div className="orbit-container orbit-right orbit-radius-2">
            <div className="orbit-item orbit-1"><i className="nes-charmander"></i></div>
            <div className="orbit-item orbit-2"><i className="nes-squirtle"></i></div>
            <div className="orbit-item orbit-3"><i className="nes-ash"></i></div>
            <div className="orbit-item orbit-4"><i className="nes-icon trophy is-large"></i></div>
            <div className="orbit-item orbit-5"><i className="nes-pokeball"></i></div>
            <div className="orbit-item orbit-6"><i className="nes-icon close is-large"></i></div>
            <div className="orbit-item orbit-7"><i className="nes-mario"></i></div>
            <div className="orbit-item orbit-8"><i className="nes-bulbasaur"></i></div>
          </div>

          <div className="orbit-container orbit-left orbit-radius-3">
            <div className="orbit-item orbit-1"><i className="nes-charmander"></i></div>
            <div className="orbit-item orbit-2"><i className="nes-squirtle"></i></div>
            <div className="orbit-item orbit-3"><i className="nes-ash"></i></div>
            <div className="orbit-item orbit-4"><i className="nes-icon trophy is-large"></i></div>
            <div className="orbit-item orbit-5"><i className="nes-pokeball"></i></div>
            <div className="orbit-item orbit-6"><i className="nes-icon close is-large"></i></div>
            <div className="orbit-item orbit-7"><i className="nes-mario"></i></div>
            <div className="orbit-item orbit-8"><i className="nes-bulbasaur"></i></div>
          </div>

          <h2 className="nes-text is-primary">Ravivez la nostalgie</h2>
        </div>
      </section>
      <section className="team-section">
      <h2 className="nes-text is-primary" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        👥 Notre Équipe
      </h2>

      <div className="team-grid">
        {/* Carte membre */}
        <div className="nes-container is-dark with-title team-member">
        <img src={avatarKevin} alt="Kevin" className="team-avatar" />
          <div>
            <p className="title">Kevin Espinoza</p>
            <p>Scrum Master</p>
            <a href="https://github.com/kevin" target="_blank" rel="noreferrer">
              <i className="nes-icon github is-medium"></i>
            </a>
          </div>
        </div>

        <div className="nes-container is-dark with-title team-member">
        <img src={avatarDjamel} alt="Djamel" className="team-avatar" />
          <div>
            <p className="title">Djamel Nait Sidenas</p>
            <p>Développeur Web</p>
            <a href="https://github.com/djamel" target="_blank" rel="noreferrer">
              <i className="nes-icon github is-medium"></i>
            </a>
          </div>
        </div>

        <div className="nes-container is-dark with-title team-member">
        <img src={avatarGenania} alt="Genania" className="team-avatar" />
          <div>
            <p className="title">Genania Obas</p>
            <p>Développeuse Web</p>
            <a href="https://github.com/genania" target="_blank" rel="noreferrer">
              <i className="nes-icon github is-medium"></i>
            </a>
          </div>
        </div>

        <div className="nes-container is-dark with-title team-member">
        <img src={avatarTerence} alt="Terence" className="team-avatar" />
          <div>
            <p className="title">Terence Sionneau</p>
            <p>Développeur Web</p>
            <a href="https://github.com/terence" target="_blank" rel="noreferrer">
              <i className="nes-icon github is-medium"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
    </main>
  );
}

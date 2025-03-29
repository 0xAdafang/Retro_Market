import 'nes.css/css/nes.min.css';

export default function Footer() {
  return (
    <footer
      className="nes-container is-dark"
      style={{
        backgroundColor: '#282d32',
        padding: '1rem 0',
        color: '#f0f9ff',
        width: '100vw', // 👈 corrige les coupures
        maxWidth: '100%',
        fontSize: '0.7rem',
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          gap: '1.25rem',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        <div>
          <h3 style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>Services</h3>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: 1.4 }}>
            <li><a href="#">Acheter</a></li>
            <li><a href="#">Vendre</a></li>
            <li><a href="#">Suivre une commande</a></li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>À propos</h3>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: 1.4 }}>
            <li><a href="#">Notre équipe</a></li>
            <li><a href="#">Mentions légales</a></li>
            <li><a href="#">Conditions</a></li>
          </ul>
        </div>

        <div style={{ maxWidth: 220 }}>
          <h3 style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>Retro Market</h3>
          <p style={{ opacity: 0.6 }}>
            Achetez, vendez et collectionnez vos jeux rétro préférés en toute simplicité.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <a href="#"><i className="nes-icon facebook"></i></a>
            <a href="#"><i className="nes-icon github"></i></a>
            <a href="#"><i className="nes-icon instagram"></i></a>
            </div>
      </div>

      <p style={{ textAlign: 'center', marginTop: '1rem', opacity: 0.3 }}>
        Retro Market © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
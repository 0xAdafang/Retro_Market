import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

export default function BurgerMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Déconnecté');
    navigate('/');
    window.location.reload();
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        className="nes-btn"
        style={{ fontSize: '0.6rem' }}
      >
        ☰ Menu
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nes-container is-rounded"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'absolute',
              top: '2.6rem',
              right: 0,
              backgroundColor: '#212529',
              padding: '1rem',
              zIndex: 10,
              minWidth: '180px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 0 0 2px white inset',
            }}
          >
            {[ 
              <Link to="/" className="nes-btn is-primary">Accueil</Link>,
              token && (
                <Link
                  to="/my-products"
                  className="nes-btn is-success"
                  onClick={() => setOpen(false)}
                >
                  Mes produits
                </Link>
              ),
              token && <Link to="/new-product" className="nes-btn is-warning">Mettre en vente</Link>,
              token && <Link to="/orders" className="nes-btn is-success">Mes commandes</Link>,
              token && <button onClick={handleLogout} className="nes-btn is-error">Déconnexion</button>,
              !token && <Link to="/login" className="nes-btn">Connexion</Link>,
              !token && <Link to="/register" className="nes-btn">Inscription</Link>,
            ]
              .filter(Boolean)
              .map((element, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  style={{
                    marginBottom: '0.5rem',
                    fontSize: '0.6rem',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  {element}
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

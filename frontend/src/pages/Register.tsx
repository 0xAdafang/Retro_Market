import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'nes.css/css/nes.min.css';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur à l'inscription");
      }

      toast.success("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      navigate('/login');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  if (localStorage.getItem('token')) {
    navigate('/');
    return null;
  }

  return (
    <div className="nes-container with-title is-centered" style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <p className="title">Inscription</p>
      <form onSubmit={handleSubmit}>
        <div className="nes-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="nes-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="nes-field" style={{ marginTop: '1rem' }}>
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            className="nes-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="nes-field" style={{ marginTop: '1rem' }}>
          <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            id="confirmPassword"
            type="password"
            className="nes-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="nes-btn is-success" style={{ marginTop: '1.5rem' }}>
          S'inscrire
        </button>
      </form>
    </div>
  );
}

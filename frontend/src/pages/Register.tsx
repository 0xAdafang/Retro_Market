import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'nes.css/css/nes.min.css';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'inscription");
      }

      toast.success("Inscription réussie ! Connectez-vous.");
      navigate("/login");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="nes-container with-title is-centered" style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <p className="title">Créer un compte</p>
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
        <label htmlFor="username">Pseudo</label>
        <input
          id="username"
          type="text"
          className="nes-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="nes-field" style={{ marginTop: "1rem" }}>
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
      <button type="submit" className="nes-btn is-primary" style={{ marginTop: "1.5rem" }}>
        S'inscrire
      </button>
    </form>
  );
}

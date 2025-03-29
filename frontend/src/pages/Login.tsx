import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "nes.css/css/nes.min.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur de connexion");
      }

      localStorage.setItem("token", data.token);
      toast.success("Connexion réussie !");
      window.location.href = '/';
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  if (localStorage.getItem("token")) {
    navigate("/");
    return null;
  }

  return (
    <div
      className="nes-container with-title is-centered"
      style={{ maxWidth: "500px", margin: "2rem auto" }}
    >
      <p className="title">Connexion</p>
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

        <button
          type="submit"
          className="nes-btn is-primary"
          style={{ marginTop: "1.5rem" }}
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}

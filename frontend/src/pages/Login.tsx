import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginBackground from "../assets/login.gif";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("🔍 Données de connexion :", data);

      if (!res.ok) {
        throw new Error(data.message || "Erreur lors de la connexion.");
      }

      toast.success("Connexion réussie !");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("authChange"));
      navigate("/");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Erreur serveur.");
    }
  };

  const handleForgot = async () => {
    const mail = prompt("Entrez votre email ou pseudo pour réinitialiser votre mot de passe :");

    if (!mail) return;

    try {
      const res = await fetch("/api/reset-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ emailOrUsername: mail })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Une erreur est survenue.");
      }

      toast.success("Lien de réinitialisation envoyé par email !");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de la demande.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="nes-container is-rounded"
        style={{
          maxWidth: "400px",
          padding: "2rem",
          background: "#fff",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <h2 className="title glitch" style={{ textAlign: "center" }}>
          Connexion
        </h2>

        <form onSubmit={handleLogin}>
          <div className="nes-field">
            <label htmlFor="email" style={{ color: '#000' }}>Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="nes-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="nes-field mt-3">
            <label htmlFor="password" style={{ color: '#000' }}>Mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="nes-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <label className="nes-checkbox mt-3">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <span style={{ marginLeft: 10 }}>Afficher le mot de passe</span>
          </label>

          <button type="submit" className="nes-btn is-primary mt-4" style={{ width: "100%" }}>
            Se connecter
          </button>

          <p
            onClick={handleForgot}
            style={{ textAlign: "center", color: "#999", cursor: "pointer", marginTop: "1rem", fontSize: "0.8rem" }}
          >
            Mot de passe ou pseudo oublié ?
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

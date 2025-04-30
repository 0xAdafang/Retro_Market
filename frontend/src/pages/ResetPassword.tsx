import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword: React.FC = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await axios.post(`/api/reset/${token}`, { newPassword: password });
      setMessage("Mot de passe réinitialisé avec succès. Vous allez être redirigé.");
      setTimeout(() => navigate("/login"), 3000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la réinitialisation.");
    }
  };

  return (
    <div
      className="nes-container is-rounded"
      style={{
        maxWidth: "400px",
        margin: "80px auto",
        padding: "2rem",
        background: "#fff",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <h2 className="title glitch" style={{ textAlign: "center" }}>
        Nouveau mot de passe
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="nes-field">
          <label htmlFor="password">Mot de passe</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="nes-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="nes-field mt-3">
          <label htmlFor="confirm">Confirmation</label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirm"
            className="nes-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          Réinitialiser
        </button>

        {error && <p className="nes-text is-error mt-2">{error}</p>}
        {message && <p className="nes-text is-success mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;

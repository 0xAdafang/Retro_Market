import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import registerBackground from "../assets/inscription.gif";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [usernameTaken, setUsernameTaken] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "password") {
      const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
      const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

      if (strongRegex.test(value)) setPasswordStrength("strong");
      else if (mediumRegex.test(value)) setPasswordStrength("medium");
      else setPasswordStrength("weak");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message?.includes("username")) setUsernameTaken(true);
        throw new Error(data.message || "Erreur lors de l'inscription.");
      }

      toast.success("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      navigate("/login");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Erreur serveur.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${registerBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="nes-container is-rounded with-title"
        style={{ maxWidth: '400px', backgroundColor: '#f0f0f0' }}
      >
        <p className="title">Créer un compte</p>

        <div className="nes-field">
          <label htmlFor="firstName" style={{ color: '#000' }}>Prénom</label>
          <input
            type="text"
            name="firstName"
            className="nes-input"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="nes-field mt-3">
          <label htmlFor="lastName" style={{ color: '#000' }}>Nom</label>
          <input
            type="text"
            name="lastName"
            className="nes-input"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="nes-field mt-3">
          <label htmlFor="gender" style={{ color: '#000' }}>Genre</label>
          <div className="nes-select">
            <select
              required
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              style={{ color: '#000' }}
            >
              <option value="" disabled hidden>Choisir...</option>
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
              <option value="autre">Autre</option>
            </select>
          </div>
        </div>

        <div className="nes-field mt-3">
          <label htmlFor="username" style={{ color: '#000' }}>Pseudo</label>
          <input
            type="text"
            name="username"
            className={`nes-input ${usernameTaken ? "is-error" : ""}`}
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="nes-field mt-3">
          <label htmlFor="email" style={{ color: '#000' }}>Email</label>
          <input
            type="email"
            name="email"
            className="nes-input"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="nes-field mt-3">
          <label htmlFor="password" style={{ color: '#000' }}>Mot de passe</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className={`nes-input ${
              passwordStrength === "strong"
                ? "is-success"
                : passwordStrength === "medium"
                ? "is-warning"
                : passwordStrength === "weak"
                ? "is-error"
                : ""
            }`}
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="nes-field mt-3">
          <label htmlFor="confirmPassword" style={{ color: '#000' }}>Confirmer</label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            className="nes-input"
            value={form.confirmPassword}
            onChange={handleChange}
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
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Register;

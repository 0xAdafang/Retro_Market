# 🎮 Retro Market

**Retro Market** est une marketplace de jeux vidéo rétro, inspirée par l’esthétique des consoles NES et des visuels cyber-néon.  
Le projet combine un **backend robuste en TypeScript avec une base de données PostgreSQL**, et un **frontend dynamique** construit avec **React, TailwindCSS et Framer Motion**.

---

## 🖼️ Aperçu visuel

![Accueil](./images/1.JPG)

---

## Fonctionnalités

### 👾 Côté utilisateur
- Navigation dans des produits rétro via une interface personnalisée
- Panier dynamique avec gestion des quantités
- Formulaire de commande (nom, adresse, méthode de paiement factice, etc.)
- Animation orbitale autour du slogan (inspirée du site *The Graph*)
- Entièrement responsive et animé grâce à **TailwindCSS + Framer Motion**

![Fonctionnalité](./images/2.JPG)

---

## ⚙️ Backend (Node.js + Express + PostgreSQL)
- Authentification sécurisée (**JWT + bcrypt**)
- Création et gestion de compte utilisateur
- Gestion des produits (CRUD)
- Commandes, paniers et historique d’achats
- Réinitialisation de mot de passe via Gmail (**Nodemailer**)
- Base de données relationnelle PostgreSQL

![Base de données](./images/E.jpg)

---

## 🛠️ Admin (bientôt disponible)
- Dashboard pour ajouter, modifier et supprimer des produits
- Visualiser et gérer les commandes

![Dashboard admin](./images/Z.JPG)

---

## 🧱 Stack Technique

| Couche     | Technologie             | Détails                             |
|------------|--------------------------|--------------------------------------|
| Frontend   | React                    | SPA avec composants réactifs         |
| UI         | TailwindCSS + NES.css    | Style rétro pixel art                |
| Animations | Framer Motion            | Transitions et effets fluides        |
| Auth       | JWT + bcrypt             | Système de connexion sécurisé        |
| Backend    | Node.js + Express        | API RESTful                          |
| ORM        | Prisma                   | Mapping BDD avec PostgreSQL          |
| Base de données | PostgreSQL         | Stockage relationnel optimisé        |
| Emails     | Nodemailer + Gmail       | Système de réinitialisation de mot de passe |

---

## 📅 Fonctionnalités à venir

- Système de wishlist (favoris)
- Notifications en temps réel
- Système de notation et d’avis produits

---

## 📄 Licence

Ce projet est sous licence **MIT**.  
Vous êtes libre de l’utiliser, le modifier et le partager, tant que vous mentionnez l’auteur original.

---

## 🚀 Exécution en local

### 🧰 Prérequis
- Node.js
- PostgreSQL
- Yarn ou npm

### ⚙️ Installation du backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev


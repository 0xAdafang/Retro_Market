Retro Market

**Retro Market** est une marketplace de jeux vidéo rétro, inspirée par l’esthétique des consoles NES et des visuels cyber-néon.  
Le projet combine un **backend robuste en TypeScript avec une base de données PostgreSQL**, et un **frontend dynamique** construit avec **React, TailwindCSS et Framer Motion**.

---

Fonctionnalités

Côté utilisateur
- Navigation dans des produits rétro via une interface personnalisée
- Panier dynamique avec gestion des quantités
- Formulaire de commande (nom, adresse, méthode de paiement factice, etc.)
- Animation orbitale autour du slogan (inspirée du site *The Graph*)
- Entièrement responsive et animé grâce à **TailwindCSS + Framer Motion**

Backend (Node.js + Express + PostgreSQL)
- Authentification sécurisée (**JWT + bcrypt**)
- Création et gestion de compte utilisateur
- Gestion des produits (CRUD)
- Commandes, paniers et historique d’achats
- Réinitialisation de mot de passe via Gmail (**Nodemailer**)
- Base de données relationnelle PostgreSQL

Admin (bientôt disponible)
- Dashboard pour ajouter, modifier et supprimer des produits
- Visualiser et gérer les commandes

---

🛠Stack Technique

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

Fonctionnalités à venir

- Système de wishlist (favoris)
- Notifications en temps réel
- Système de notation et d’avis produits

---

Licence

Ce projet est sous licence **MIT**.  
Vous êtes libre de l’utiliser, le modifier et le partager, tant que vous mentionnez l’auteur original.

---

Exécution en local

### Prérequis
- Node.js
- PostgreSQL
- Yarn ou npm

### Installation du backend

bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev


---

# Retro Market

**Retro Market** is a retro video game marketplace, inspired by the aesthetics of NES consoles and cyber-neon visuals. The project combines a robust backend in TypeScript with a PostgreSQL database, and a dynamic frontend built with React, TailwindCSS, and Framer Motion.

---

## Features

### User side
- Browse retro-style products with a custom interface
- Dynamic cart with quantity management
- Checkout form (name, address, fake payment method, etc.)
- Orbital animation around the slogan (inspired by The Graph website)
- Fully responsive and animated thanks to TailwindCSS + Framer Motion

### Backend (Node.js + Express + PostgreSQL)
- Secure authentication (JWT + bcrypt)
- User account creation and management
- Product management (CRUD)
- Orders, carts, and purchase history
- Password reset via Gmail (using Nodemailer)
- PostgreSQL relational database

###  Admin (coming soon)
- Dashboard to add, edit, and delete products
- View and manage orders

---

## 🛠Tech Stack

| Layer     | Technology            | Details                          |
|-----------|------------------------|----------------------------------|
| Frontend  | React                  | SPA with reactive components     |
| UI        | TailwindCSS + NES.css | Retro pixel art style            |
| Animations| Framer Motion          | Smooth transitions and effects   |
| Auth      | JWT + bcrypt           | Secure login system              |
| Backend   | Node.js + Express      | RESTful API                      |
| ORM       | Prisma                 | Database mapping with PostgreSQL |
| Database  | PostgreSQL             | Relational & optimized storage   |
| Emails    | Nodemailer + Gmail     | Password reset system            |

---

##  Upcoming Features

- Wishlist system  
- Real-time notifications  
- Product rating and review system  

---

## License

This project is under the MIT License.  
You're free to use, modify, and share it, just don’t forget to credit the original author.

---

## Run Locally

### Prerequisites
- Node.js
- PostgreSQL
- Yarn or npm

### Backend Setup

bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev

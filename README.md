# Retro_Market

**Retro Market** est une marketplace en ligne dédiée aux jeux vidéo rétro, inspirée de l’esthétique NES et cyber-néon. Le projet combine un backend robuste en TypeScript avec une base de données PostgreSQL, et une interface utilisateur animée en React, TailwindCSS et Framer Motion.

---

## Fonctionnalités

### Côté utilisateur
- Parcours des produits avec interface rétro personnalisée
- Panier dynamique avec gestion des quantités
- Checkout avec formulaire complet (nom, adresse, paiement fictif, etc.)
- Animation de type orbitale autour du slogan (inspirée du site The Graph)
- Responsive et fluide grâce à TailwindCSS + Framer Motion

### Backend (Node.js + Express + Postgres)
- Authentification sécurisée (JWT + bcrypt)
- Création / gestion de comptes utilisateurs
- Gestion des produits (CRUD)
- Commandes / paniers / historique
- Réinitialisation de mot de passe (via Gmail + Nodemailer)
- Base de données PostgreSQL

### Admin (à venir)
- Tableau de bord pour ajouter, modifier ou supprimer des produits
- Visualisation des commandes

---

## Stack technique

| Côté | Techno | Détail |
|------|--------|--------|
| Frontend | React | SPA, composants réactifs |
| UI | TailwindCSS + NES.css | Style rétro pixel art |
| Animations | Framer Motion | Fluidité, animations orbitales |
| Auth | JWT + bcrypt | Connexion sécurisée |
| Backend | Node.js + Express | API RESTful |
| ORM | Prisma | Mapping avec PostgreSQL |
| Base de données | PostgreSQL | Relationnelle, optimisée |
| Mailing | Nodemailer + Gmail | Réinitialisation de mot de passe |

---

## À venir
Système de wishlist

Notifications en temps réel

Système de notation/commentaire

## Licence
Ce projet est sous licence MIT. Libre à vous de l’adapter, mais mentionnez l’auteur original si vous le reprenez.

## lancer le projet


---

## 🧪 Lancer le projet localement

### Prérequis
- Node.js
- PostgreSQL
- Yarn ou npm

### Setup backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev


### Setup frontend

cd frontend
npm install
npm run dev




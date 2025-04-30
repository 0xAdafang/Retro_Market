# 🎮 Retro Market

**Retro Market** is a retro video game marketplace, inspired by the aesthetics of NES consoles and cyber-neon visuals. The project combines a robust backend in TypeScript with a PostgreSQL database, and a dynamic frontend built with React, TailwindCSS, and Framer Motion.

---

## 🚀 Features

### 🧑‍💻 User side
- Browse retro-style products with a custom interface
- Dynamic cart with quantity management
- Checkout form (name, address, fake payment method, etc.)
- Orbital animation around the slogan (inspired by The Graph website)
- Fully responsive and animated thanks to TailwindCSS + Framer Motion

### ⚙️ Backend (Node.js + Express + PostgreSQL)
- Secure authentication (JWT + bcrypt)
- User account creation and management
- Product management (CRUD)
- Orders, carts, and purchase history
- Password reset via Gmail (using Nodemailer)
- PostgreSQL relational database

### 🔧 Admin (coming soon)
- Dashboard to add, edit, and delete products
- View and manage orders

---

## 🛠️ Tech Stack

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

## 🔮 Upcoming Features

- Wishlist system  
- Real-time notifications  
- Product rating and review system  

---

## 📜 License

This project is under the MIT License.  
You're free to use, modify, and share it, just don’t forget to credit the original author.

---

## 🧪 Run Locally

### Prerequisites
- Node.js
- PostgreSQL
- Yarn or npm

### Backend Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev

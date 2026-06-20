# AgroConnect – Smart Agriculture Management and Marketplace System

A full-stack, responsive web application designed for farmers, buyers, and administrators in India. The platform integrates crop monitoring, smart advisor analytics, bilingual translation, AI disease scanning, and a direct-to-consumer marketplace.

---

## 🛠️ Tech Stack
* **Frontend:** React 18, Vite, React Router v6, Axios, Recharts, Framer Motion, Context API.
* **Backend:** Node.js, Express, MongoDB (Mongoose), JSON Web Tokens (JWT).
* **Database:** MongoDB Atlas (Cloud) / Local MongoDB with automatic in-memory fallback seeding.

---

## 📂 Project Structure
```text
c:\Users\ishwa\OneDrive\Desktop\Agroculture\
├── backend/          # Node.js + Express API Server
│   ├── config/       # Database & environment configurations
│   ├── middleware/   # JWT authentication & role authorization
│   ├── models/       # Mongoose schemas (User, Crop, Order, Product, etc.)
│   ├── routes/       # API endpoints (Marketplace, Chats, Crops, Disease scanner)
│   └── server.js     # Express server entry point
└── frontend/         # React.js SPA (Vite builder)
    ├── src/
    │   ├── api/      # Axios client configuration with JWT injection
    │   ├── components/ # Shared Layouts, Sidebar, Floating chatbot
    │   ├── context/  # State providers (Auth, Cart, Language translations)
    │   └── pages/    # 40+ screens (Public, Farmer, Buyer, Admin)
```

---

## ⚙️ Local Setup

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed on your system.

### 2. Configure Environment Variables
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/agroconnect
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```
*Note: If no local or cloud database is connected, the backend will automatically spin up an in-memory database and seed the default demo accounts (`farmer@demo.com`, `buyer@demo.com`, `admin@demo.com` with password `demo123`).*

### 3. Install & Start Development Servers
In two separate terminals:

**Start Backend:**
```bash
cd backend
npm install
npm run dev
```

**Start Frontend:**
```bash
cd frontend
npm install
npm run dev
```

The application will be live at `http://localhost:5173`.

---

## 🚀 Production Deployment Guide

We recommend hosting the **Backend** on **Render** and the **Frontend** on **Vercel**.

### Step 1: Push Project to GitHub
Initialize a git repository in the root directory and push your project to a remote repository on GitHub.

### Step 2: Deploy Backend on Render
1. Sign up on [Render.com](https://render.com) and log in.
2. Click **New** ➔ **Web Service**.
3. Connect your GitHub repository.
4. Set the following settings:
   * **Root Directory:** `backend`
   * **Build Command:** `npm install`
   * **Start Command:** `node server.js`
5. In the **Environment** section, add your environment variables from `backend/.env` (especially `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`).
6. Click **Deploy**. Render will host your API at a address like: `https://agroconnect-api.onrender.com`.

### Step 3: Deploy Frontend on Vercel
1. Sign up on [Vercel.com](https://vercel.com) and log in.
2. Click **Add New** ➔ **Project**.
3. Select your GitHub repository.
4. Configure the settings:
   * **Root Directory:** `frontend`
   * **Framework Preset:** `Vite`
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
5. In the **Environment Variables** section, add:
   * **Key:** `VITE_API_URL`
   * **Value:** `https://agroconnect-api.onrender.com/api` *(Your live Render API URL with `/api` appended)*
6. Click **Deploy**. Vercel will host your website at a custom address like: `https://agroconnect-app.vercel.app`.

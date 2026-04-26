# <div align="center">Collège.</div>

<div align="center">
  <strong>India's Premier Full-Stack College Comparison Engine</strong>
</div>

<div align="center">
  <br />
  <a href="https://college-comparision-platform.netlify.app/">
    <img src="https://img.shields.io/badge/Live_Demo-0052FF?style=for-the-badge&logo=netlify&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://github.com/Self-Lakshh/College-Comparision-Platform">
    <img src="https://img.shields.io/badge/GitHub_Project-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
</div>

<div align="center">
  <br />
  <img src="https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" />
</div>

---

## 🚀 The Vision

Collège is a high-performance, full-stack comparison engine designed to solve the complexity of higher education decisions in India. Built with a "Data-First" philosophy, it provides students with a cinematic, high-speed interface to browse, filter, and compare top-tier institutions.

### ✨ Key Features

- **⚡ Instant Discovery**: Sub-200ms filtering and search across thousands of institutions.
- **🌗 Dual-Mode Premium UI**: A sophisticated, Zinc-based design system that adapts perfectly to Light and Dark environments.
- **📊 Intelligence Engine**: Automatic "Best Value" detection in side-by-side comparisons ( emerald-highlighted winners).
- **📱 Ultra-Responsive**: Zero-compromise experience from desktop comparison reports to mobile discovery sheets.
- **🛡️ Production Grade**: Secure, rate-limited backend with Helmet protection and optimized Mongoose queries.

---

## 🛠️ Tech Architecture

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite 6, shadcn/ui, Lucide Icons |
| **State** | Context API (Comparison Engine), Custom Hooks |
| **Backend** | Node.js, Express, Morgan, Helmet |
| **Database** | MongoDB Atlas with Mongoose ODM |
| **Deployment** | Netlify (Edge Functions), AWS EC2 (PM2 + Nginx) |

---

## 🚦 Local Quickstart

### 1️⃣ Clone & Backend Setup
```bash
git clone https://github.com/Self-Lakshh/College-Comparision-Platform.git
cd College-Comparision-Platform/backend
npm install
cp .env.example .env
# Add your MONGO_URI in .env
npm run seed  # Populate initial data
npm run dev   # API on http://localhost:5000
```

### 2️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev   # App on http://localhost:5173
```

---

## 📐 Design Philosophy

- **Tabular Numbers**: Fee and rank data use `font-variant-numeric: tabular-nums` for perfect scanning alignment.
- **Lean Reads**: All API queries use `.lean()` to bypass Mongoose hydration, cutting response overhead by 30%.
- **Zero-Flash Theme**: Custom blocking script in `index.html` ensures dark mode loads before the first paint.


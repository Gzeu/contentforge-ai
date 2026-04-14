<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24&height=200&section=header&text=ContentForge%20AI&fontSize=55&fontColor=ffffff&animation=fadeIn&desc=Ultra-Viral%20AI%20Ghostwriter%20for%20YouTube%2C%20TikTok%2C%20Reels%20%26%20X&descSize=18&descAlignY=75" width="100%"/>

[![Live Demo](https://img.shields.io/badge/Live%20Demo-contentforge--ai-brightgreen?style=for-the-badge&logo=vercel&logoColor=white)](https://contentforge-ai-mocha.vercel.app/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://github.com/Gzeu/contentforge-ai)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://github.com/Gzeu/contentforge-ai)
[![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)](https://github.com/Gzeu/contentforge-ai)
[![Groq](https://img.shields.io/badge/Groq-LLaMA%203.3%2070B-orange?style=for-the-badge)](https://groq.com)
[![LangSmith](https://img.shields.io/badge/LangSmith-Monitoring-blue?style=for-the-badge)](https://smith.langchain.com)

</div>

---

## 📌 Overview

**ContentForge AI** este un ghostwriter AI ultra-viral care genereaza automat continut optimizat pentru **YouTube**, **TikTok**, **Reels** si **X (Twitter)**.

Powered by **Groq LLaMA 3.3 70B** (4s / 1500+ tokens), orchestrat cu **LangChain**, monitorizat cu **LangSmith** — nisa: **Crypto, EGLD, AI Agents, MultiversX**.

> *Genereaza titluri virale, hook-uri, scripturi complete cu timestamps, descrieri SEO, hashtag-uri si idei de thumbnail — intr-un singur click.*

---

## ✨ Ce genereaza

Pentru fiecare subiect, agentul produce automat:

| Output | Detalii |
|--------|---------|
| 🔥 **5 Titluri Ultra-Virale** | Optimizate pentru CTR maxim pe fiecare platform |
| ⏱️ **Hook (3-8 secunde)** | Opening care retine audienta in primele secunde |
| 📝 **Script Complet** | Cu timestamps, cue-uri vizuale si structura narativa |
| 🔍 **Descriere SEO** | Optimizata cu keywords + timestamps pentru YouTube |
| 🏷️ **15 Hashtag-uri** | Selectate strategic per platforma |
| 🎨 **5 Idei Thumbnail** | Concepte vizuale gata de implementat |
| 🎤 **Sugestii Voiceover & Editare** | Ton, ritm, efecte recomandate |

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Tehnologie |
|-------|------------|
| **Backend** | FastAPI + LangChain + Groq (LLaMA 3.3 70B) + LangSmith tracing |
| **Frontend** | Next.js 14 + Tailwind CSS (dark mode) |
| **AI Engine** | Groq API — ~4s latenta, 1500+ tokens/request |
| **Monitoring** | LangSmith — traces automat per request |
| **Deploy** | Vercel (frontend) + Railway.app (backend) |

</div>

### Badges

<div align="center">

![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js%2014-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)

</div>

---

## 📂 Structura Proiect

```
contentforge-ai/
├── backend/
│   ├── chain.py          # LangChain + Groq chain
│   ├── main.py           # FastAPI server
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── app/
    │   ├── page.tsx          # Main UI
    │   └── api/generate/
    │       └── route.ts      # API proxy (maxDuration=60)
    ├── components/
    │   ├── GenerateForm.tsx
    │   └── ResultCard.tsx
    └── package.json
```

---

## 🚀 Setup Local

### 1. Clone repo

```bash
git clone https://github.com/Gzeu/contentforge-ai.git
cd contentforge-ai
```

### 2. Backend (FastAPI + LangChain)

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Editeaza .env cu cheile tale
uvicorn main:app --reload --port 8000
```

### 3. Frontend (Next.js 14)

```bash
cd frontend
npm install
# Creaza .env.local
echo "BACKEND_URL=http://localhost:8000" > .env.local
npm run dev
# Deschide http://localhost:3000
```

---

## 🔑 Variabile de Mediu

### Backend — `backend/.env`

```env
GROQ_API_KEY=gsk_...
LANGCHAIN_API_KEY=lsv2_...
LANGCHAIN_TRACING_V2=true
LANGCHAIN_PROJECT=ContentForge-v1
```

### Frontend — `frontend/.env.local`

```env
BACKEND_URL=https://your-backend.railway.app
```

---

## ☁️ Deploy Gratuit

| Serviciu | Platform | Cost |
|---------|----------|------|
| **Frontend** | [Vercel](https://vercel.com) | Gratuit, nelimitat |
| **Backend** | [Railway.app](https://railway.app) | Gratuit 500h/luna |
| **AI** | [Groq API](https://groq.com) | Gratuit (rate limit generos) |
| **Monitoring** | [LangSmith](https://smith.langchain.com) | Gratuit tier disponibil |

---

## 📊 LangSmith Monitoring

Toate trace-urile sunt vizibile la [smith.langchain.com](https://smith.langchain.com/) sub proiectul `ContentForge-v1`.

Fiecare request este logat automat cu:
- Input (subiect, platforma, ton, lungime)
- Output complet generat
- Latenta si token usage
- Chain steps si LLM calls

---

## 🌍 Platforme Suportate

| Platforma | Ton | Format Output |
|-----------|-----|---------------|
| 🏹 YouTube | Educational, Viral, Storytelling | Script lung + timestamps |
| 🎵 TikTok | Energic, Fast-paced | Hook + script scurt |
| 📸 Instagram Reels | Visual, Aesthetic | Script vizual + hashtags |
| ✖️ X (Twitter) | Concis, Provocator | Thread + hook |

---

<div align="center">

**Made with ❤️ by [George Pricop](https://github.com/Gzeu)**

[![GitHub](https://img.shields.io/badge/GitHub-Gzeu-181717?style=for-the-badge&logo=github)](https://github.com/Gzeu)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-george--pricop-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/george-pricop)

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,20,24&height=100&section=footer" width="100%"/>

</div>

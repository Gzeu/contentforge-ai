# ContentForge AI

Ghostwriter AI ultra-viral pentru YouTube, TikTok, Reels & X.
Powered by **Groq LLaMA 3.3 70B** + **LangChain** + **LangSmith**.

## Stack

- **Backend**: FastAPI + LangChain + Groq (LLaMA 3.3 70B) + LangSmith tracing
- **Frontend**: Next.js 14 + Tailwind CSS (dark mode)
- **AI**: Groq API (gratuit) - viteza 4s / 1500+ tokens
- **Monitoring**: LangSmith traces automat

## Structura

```
contentforge-ai/
├── backend/
│   ├── chain.py          # LangChain + Groq chain
│   ├── main.py           # FastAPI server
│   ├── requirements.txt
│   └── .env.example
└── frontend/
    ├── app/
    │   ├── page.tsx              # Main UI
    │   └── api/generate/route.ts # API proxy
    ├── components/
    │   ├── GenerateForm.tsx
    │   └── ResultCard.tsx
    └── package.json
```

## Setup local

### Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Editeaza .env cu cheile tale
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
# Creaza .env.local cu BACKEND_URL=http://localhost:8000
npm run dev
# Deschide http://localhost:3000
```

## Variabile de mediu

### Backend (.env)
```
GROQ_API_KEY=gsk_...
LANGCHAIN_API_KEY=lsv2_...
LANGCHAIN_TRACING_V2=true
LANGCHAIN_PROJECT=ContentForge-v1
```

### Frontend (.env.local)
```
BACKEND_URL=https://your-backend.railway.app
```

## Deploy gratuit

- **Backend**: Railway.app (gratuit 500h/luna)
- **Frontend**: Vercel (gratuit nelimitat)

## Output generat

Pentru fiecare subiect, agentul genereaza:
- 5 Titluri Ultra-Virale
- Hook (3-8 secunde)
- Script Complet cu timestamps si vizuale
- Descriere SEO + Timestamps
- 15 Hashtaguri
- 5 Idei Thumbnail
- Sugestii Voiceover & Editare

## LangSmith

Toate trace-urile sunt vizibile la [smith.langchain.com](https://smith.langchain.com) sub proiectul `ContentForge-v1`.

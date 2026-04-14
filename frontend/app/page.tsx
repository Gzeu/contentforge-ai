'use client';
import { useState, useEffect } from 'react';

const PLATFORMS = ['YouTube', 'TikTok', 'Reels', 'X/Twitter'];
const TONES = ['Edgy & FOMO', 'Motivational', 'Educativ', 'Funny & Viral', 'Storytelling'];
const LENGTHS = ['Short (60s)', 'Medium (5 min)', 'Long (10min+)'];

const RANDOM_NISE = [
  'fitness, nutritie, slabit, sport',
  'cooking, retete, food, bucatarie',
  'travel, calatorii, aventura, destinatii',
  'fashion, beauty, lifestyle, outfit',
  'gaming, esports, streaming, Twitch',
  'real estate, imobiliare, investitii',
  'parenting, familie, copii, educatie',
  'automotive, masini, tuning, review',
  'tech, gadgets, review, telefoane',
  'business, antreprenoriat, startup, bani',
  'animale, pets, caini, pisici',
  'constructii, renovari, DIY, casa',
  'muzica, cover, vlog, entertainment',
  'psihologie, mindset, motivatie, dezvoltare',
];

const RANDOM_SUBIECTE = [
  'Cum sa castigi 5000 RON extra pe luna fara sa parasesti jobul',
  'Greseala pe care o fac toti incepatorii si cum sa o eviti',
  'Secretul pe care expertii nu vor sa il stii',
  'Am incercat 30 de zile si rezultatele m-au socat',
  'De ce 90% dintre oameni esueaza si cum sa fii in top 10%',
  'Transformare completa in 7 zile - inainte si dupa',
  'Cel mai mare mit desfiintat odata pentru totdeauna',
  'Ce am invatat dupa 1 an de experiente extreme',
];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

type HistoryItem = {
  topic: string;
  channel_info: string;
  platform: string;
  tone: string;
  result: string;
  date: string;
};

export default function Home() {
  const [channelInfo, setChannelInfo] = useState('');
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('YouTube');
  const [tone, setTone] = useState('Edgy & FOMO');
  const [length, setLength] = useState('Medium (5 min)');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [lastParams, setLastParams] = useState<any>(null);
  const [nisaPlaceholder, setNisaPlaceholder] = useState('');
  const [subiectPlaceholder, setSubiectPlaceholder] = useState('');

  useEffect(() => {
    setNisaPlaceholder(getRandom(RANDOM_NISE));
    setSubiectPlaceholder(getRandom(RANDOM_SUBIECTE));
    const saved = localStorage.getItem('contentforge_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveToHistory = (item: HistoryItem) => {
    const updated = [item, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem('contentforge_history', JSON.stringify(updated));
  };

  const generate = async (params?: any) => {
    const p = params || { channelInfo, topic, platform, tone, length };
    const finalChannelInfo = p.channelInfo || nisaPlaceholder;
    const finalTopic = p.topic || subiectPlaceholder;
    if (!finalTopic.trim()) { setError('Introduceti subiectul video!'); return; }
    setLoading(true);
    setError('');
    setResult('');
    setLastParams({ ...p, channelInfo: finalChannelInfo, topic: finalTopic });
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: finalTopic, channel_info: finalChannelInfo, platform: p.platform, tone: p.tone, length: p.length }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Eroare server');
      setResult(data.result);
      saveToHistory({ topic: finalTopic, channel_info: finalChannelInfo, platform: p.platform, tone: p.tone, result: data.result, date: new Date().toLocaleString('ro-RO') });
    } catch (e: any) {
      setError('Eroare la generare. Verifica backend-ul.');
    } finally {
      setLoading(false);
    }
  };

  const copyAll = () => { navigator.clipboard.writeText(result); };

  const shufflePlaceholders = () => {
    setNisaPlaceholder(getRandom(RANDOM_NISE));
    setSubiectPlaceholder(getRandom(RANDOM_SUBIECTE));
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-violet-600/20 border border-violet-500/30 text-violet-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Powered by Groq · LangSmith · LLaMA 3.3 70B
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-3">
            ContentForge AI
          </h1>
          <p className="text-zinc-400 text-lg">Ghostwriter ultra-viral pentru creatori 1M-5M followeri.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm text-zinc-400">Nisa canal</label>
              <button onClick={shufflePlaceholders} className="text-xs text-violet-400 hover:text-violet-300 transition" title="Genereaza alta idee">
                🎲 Shuffle idei
              </button>
            </div>
            <input
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition"
              value={channelInfo}
              onChange={e => setChannelInfo(e.target.value)}
              placeholder={nisaPlaceholder}
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">Subiect video</label>
            <textarea
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition resize-none"
              rows={3}
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder={subiectPlaceholder}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">Platforma</label>
              <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition" value={platform} onChange={e => setPlatform(e.target.value)}>
                {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">Ton</label>
              <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition" value={tone} onChange={e => setTone(e.target.value)}>
                {TONES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">Lungime</label>
              <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition" value={length} onChange={e => setLength(e.target.value)}>
                {LENGTHS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => generate()} disabled={loading} className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition text-base">
              {loading ? 'Generez...' : 'Genereaza VIRAL'}
            </button>
            {result && !loading && (
              <button onClick={() => generate(lastParams)} className="px-5 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-3.5 rounded-xl transition text-sm" title="Regenereaza">
                🔄
              </button>
            )}
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </div>

        {loading && (
          <div className="mt-8 flex flex-col items-center gap-3 text-zinc-500">
            <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm">LLaMA 3.3 70B genereaza continut viral...</p>
          </div>
        )}

        {result && !loading && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-violet-400 font-bold text-lg">Continut generat</h2>
              <button onClick={copyAll} className="bg-zinc-700 hover:bg-zinc-600 text-white text-sm px-4 py-1.5 rounded-lg transition">Copiaza tot</button>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed">
              {result}
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-8">
            <button onClick={() => setShowHistory(!showHistory)} className="w-full flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3 text-zinc-400 hover:text-white transition text-sm">
              <span>Istoric generari ({history.length})</span>
              <span>{showHistory ? '▲' : '▼'}</span>
            </button>
            {showHistory && (
              <div className="mt-2 space-y-2">
                {history.map((item, i) => (
                  <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 cursor-pointer hover:border-violet-500/50 transition"
                    onClick={() => { setResult(item.result); setTopic(item.topic); setChannelInfo(item.channel_info); setShowHistory(false); }}>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-white font-medium truncate">{item.topic}</p>
                      <span className="text-xs text-zinc-500 ml-3 shrink-0">{item.date}</span>
                    </div>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs text-violet-400">{item.platform}</span>
                      <span className="text-xs text-zinc-500">·</span>
                      <span className="text-xs text-zinc-400">{item.tone}</span>
                      <span className="text-xs text-zinc-500">·</span>
                      <span className="text-xs text-zinc-500">{item.channel_info}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

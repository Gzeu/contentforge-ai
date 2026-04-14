"use client";
import { useState } from "react";

interface Props {
  onResult: (result: string) => void;
  onLoading: (v: boolean) => void;
  loading: boolean;
}

export default function GenerateForm({ onResult, onLoading, loading }: Props) {
  const [topic, setTopic] = useState("");
  const [channelInfo, setChannelInfo] = useState("Crypto, EGLD, AI Agents, Trading");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, channel_info: channelInfo }),
      });
      const data = await res.json();
      onResult(data.result || data.error);
    } catch {
      onResult("Eroare la generare. Verifica backend-ul.");
    } finally {
      onLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-2xl">
      <div>
        <label className="text-sm text-zinc-400 mb-1 block">Nisa canal</label>
        <input
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition"
          value={channelInfo}
          onChange={(e) => setChannelInfo(e.target.value)}
          placeholder="ex: Crypto, EGLD, AI Agents, Trading"
        />
      </div>
      <div>
        <label className="text-sm text-zinc-400 mb-1 block">Subiect video</label>
        <textarea
          className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition resize-none h-28"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="ex: Cum sa faci bani cu AI agents pe MultiversX in 2026"
        />
      </div>
      <button
        type="submit"
        disabled={loading || !topic.trim()}
        className="bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl transition text-lg"
      >
        {loading ? "Generez..." : "Genereaza VIRAL"}
      </button>
    </form>
  );
}

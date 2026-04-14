"use client";
import { useState } from "react";
import GenerateForm from "@/components/GenerateForm";
import ResultCard from "@/components/ResultCard";

export default function Home() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-16">
      <div className="mb-12 text-center">
        <div className="inline-block bg-violet-600/20 border border-violet-500/30 text-violet-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
          Powered by Groq · LangSmith · LLaMA 3.3 70B
        </div>
        <h1 className="text-5xl font-black bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-3">
          ContentForge AI
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl">
          Ghostwriter ultra-viral pentru creatori 1M-5M followeri.
          YouTube · TikTok · Reels · X
        </p>
      </div>
      <GenerateForm onResult={setResult} onLoading={setLoading} loading={loading} />
      {loading && (
        <div className="mt-12 flex flex-col items-center gap-3 text-zinc-500">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm">LLaMA 3.3 70B genereaza continut viral...</p>
        </div>
      )}
      {result && !loading && <ResultCard result={result} />}
    </main>
  );
}

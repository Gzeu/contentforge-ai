"use client";

interface Props {
  result: string;
}

export default function ResultCard({ result }: Props) {
  const handleCopy = () => navigator.clipboard.writeText(result);

  return (
    <div className="w-full max-w-2xl mt-8">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-violet-400 font-bold text-lg">Continut generat</h2>
        <button
          onClick={handleCopy}
          className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-lg transition"
        >
          Copiaza tot
        </button>
      </div>
      <pre className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed overflow-auto max-h-[600px]">
        {result}
      </pre>
    </div>
  );
}

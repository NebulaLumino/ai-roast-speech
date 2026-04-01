"use client";
import { useState } from "react";

export default function RoastSpeechPage() {
  const [honoree, setHonoree] = useState("");
  const [relationship, setRelationship] = useState("Friend");
  const [funnyTraits, setFunnyTraits] = useState("");
  const [cleanOrRaunchy, setCleanOrRaunchy] = useState("Family-friendly but edgy");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!honoree.trim()) return;
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ honoree, relationship, funnyTraits, cleanOrRaunchy }),
    });
    const data = await res.json();
    setOutput(data.result || data.error);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-950 via-slate-950 to-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-sky-300 mb-2">AI Roast Speech</h1>
        <p className="text-slate-400 mb-8">Write hilarious roast speeches that leave them laughing (and loving it)</p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900/60 border border-sky-500/20 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Honoree Name *</label>
              <input value={honoree} onChange={e => setHonoree(e.target.value)} placeholder="Who's being roasted?"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Your Relationship</label>
              <select value={relationship} onChange={e => setRelationship(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-sky-500">
                {["Best friend","Sibling","Coworker","College roommate","Wedding party member","Boss (brave!)"].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Level</label>
              <select value={cleanOrRaunchy} onChange={e => setCleanOrRaunchy(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-sky-500">
                {["Family-friendly but edgy","PG-13","Hold nothing back"].map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Funny Traits / Stories</label>
              <textarea value={funnyTraits} onChange={e => setFunnyTraits(e.target.value)} rows={4}
                placeholder="Embarrassing stories, funny habits, memorable moments..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 resize-none" />
            </div>
            <button onClick={handleGenerate} disabled={loading}
              className="w-full bg-sky-600 hover:bg-sky-500 disabled:bg-sky-800 text-white font-semibold py-3 rounded-xl transition-colors">
              {loading ? "Roasting..." : "Write Roast Speech"}
            </button>
          </div>
          <div className="bg-slate-900/60 border border-sky-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-sky-300 mb-4">Roast Speech</h2>
            {output ? (
              <pre className="text-slate-200 text-sm whitespace-pre-wrap font-sans leading-relaxed max-h-[600px] overflow-y-auto">{output}</pre>
            ) : (
              <div className="text-slate-500 flex items-center justify-center h-64">Roast speech will appear here...</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

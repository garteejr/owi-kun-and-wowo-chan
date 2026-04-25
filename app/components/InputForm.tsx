"use client";

import { useState } from "react";

export default function InputForm({ onSubmit }: any) {
  const [konteks, setKonteks] = useState("");
  const [kronologi, setKronologi] = useState("");

  const handleSend = () => {
    if (!konteks || !kronologi) return;

    onSubmit({ konteks, kronologi });

    setKonteks("");
    setKronologi("");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      <input
        className="w-full border p-2 mb-2 rounded"
        placeholder="Konteks masalah (contoh: penipuan online)"
        value={konteks}
        onChange={(e) => setKonteks(e.target.value)}
      />

      <textarea
        className="w-full border p-2 mb-2 rounded"
        placeholder="Ceritakan kronologi..."
        value={kronologi}
        onChange={(e) => setKronologi(e.target.value)}
      />

      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Analisis
      </button>
    </div>
  );
}
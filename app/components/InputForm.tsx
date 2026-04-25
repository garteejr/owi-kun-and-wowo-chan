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
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <svg width="18" height="18" fill="none" stroke="#5a9e3a" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 12h6M9 16h6M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-xl lg:text-2xl text-neutral-900 leading-tight">
              Ceritakan Masalahmu
            </h2>
            <p className="text-sm text-neutral-500 mt-0.5">
              Isi kolom di bawah untuk mendapatkan analisis hukum
            </p>
          </div>
        </div>

        {/* Two-column on lg, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">

          {/* Konteks */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-green-700 uppercase tracking-widest">
              Konteks Masalah
            </label>
            <p className="text-xs text-neutral-400 mb-1">
              Jenis masalah hukum yang dihadapi
            </p>
            <input
              type="text"
              placeholder="Contoh: penipuan online, sengketa kontrak..."
              value={konteks}
              onChange={(e) => setKonteks(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
            />
          </div>

          {/* Kronologi */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-green-700 uppercase tracking-widest">
              Kronologi
            </label>
            <p className="text-xs text-neutral-400 mb-1">
              Ceritakan kejadian secara runtut dan detail
            </p>
            <textarea
              placeholder="Ceritakan kejadian secara runtut..."
              value={kronologi}
              onChange={(e) => setKronologi(e.target.value)}
              className="w-full flex-1 min-h-[130px] lg:min-h-[160px] bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm sm:text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition resize-none"
            />
          </div>
        </div>

        {/* Divider + Button row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-neutral-100">
          <p className="text-xs text-neutral-400">
            Hasil analisis bersifat informatif dan tidak menggantikan konsultasi hukum profesional.
          </p>
          <button
            onClick={handleSend}
            disabled={!konteks || !kronologi}
            className="shrink-0 flex items-center gap-2 px-7 py-3 rounded-full bg-green-400 text-green-900 text-sm sm:text-base font-medium hover:bg-green-500 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Analisis Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
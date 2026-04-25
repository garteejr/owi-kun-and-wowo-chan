"use client";

import { useState } from "react";

interface InputFormProps {
  onSubmit: (data: { konteks: string; kronologi: string }) => void;
  disabled?: boolean;
}

const MAX_KRONOLOGI = 1000;

export default function InputForm({ onSubmit, disabled = false }: InputFormProps) {
  const [konteks, setKonteks] = useState("");
  const [kronologi, setKronologi] = useState("");

  const isValid = konteks.trim().length > 0 && kronologi.trim().length > 0;
  const kronologiRemaining = MAX_KRONOLOGI - kronologi.length;

  const handleSend = () => {
    if (!isValid) return;
    onSubmit({ konteks: konteks.trim(), kronologi: kronologi.trim() });
    setKonteks("");
    setKronologi("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isValid) handleSend();
  };

  return (
    <div className="w-full py-6">
      <div className="w-full bg-white border border-neutral-200 rounded-2xl p-8 sm:p-10 lg:p-14 shadow-sm">

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

        {/* Fields — stacked layout agar seimbang secara visual */}
        <div className="flex flex-col gap-6 mb-8">

          {/* Konteks */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="konteks"
              className="text-xs font-semibold text-green-700 uppercase tracking-widest"
            >
              Konteks Masalah
            </label>
            <p className="text-xs text-neutral-400 mb-1">
              Jenis masalah hukum yang dihadapi
            </p>
            <input
              id="konteks"
              type="text"
              placeholder="Contoh: penipuan online, sengketa kontrak..."
              value={konteks}
              onChange={(e) => setKonteks(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition"
            />
          </div>

          {/* Kronologi */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="kronologi"
                className="text-xs font-semibold text-green-700 uppercase tracking-widest"
              >
                Kronologi
              </label>
              <span
                className={`text-xs tabular-nums transition-colors ${
                  kronologiRemaining < 100
                    ? "text-red-400 font-medium"
                    : "text-neutral-400"
                }`}
              >
                {kronologiRemaining} karakter tersisa
              </span>
            </div>
            <p className="text-xs text-neutral-400 mb-1">
              Ceritakan kejadian secara runtut dan detail
            </p>
            <textarea
              id="kronologi"
              placeholder="Ceritakan kejadian secara runtut..."
              value={kronologi}
              onChange={(e) => {
                if (e.target.value.length <= MAX_KRONOLOGI) {
                  setKronologi(e.target.value);
                }
              }}
              rows={6}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 leading-relaxed focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition resize-none"
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
            disabled={!isValid || disabled}
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
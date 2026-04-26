"use client";

import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";

const team = [
  {
    name: "Adrian",
    role: "Backend Developer",
    initials: "AD",
    accent: "#185fa5",
    bg: "#e6f1fb",
    desc: "Membangun fondasi server & API yang kuat di balik setiap analisis.",
  },
  {
    name: "Tegar",
    role: "Frontend Developer",
    initials: "TG",
    accent: "#3b6d11",
    bg: "#eaf3de",
    desc: "Merancang tampilan yang bersih, intuitif, dan enak dipakai.",
  },
  {
    name: "Davin",
    role: "Product Manager",
    initials: "DV",
    accent: "#854f0b",
    bg: "#faeeda",
    desc: "Menjaga arah produk agar selalu relevan dengan kebutuhan pengguna.",
  },
  {
    name: "Chania",
    role: "Researcher",
    initials: "CH",
    accent: "#993556",
    bg: "#fbeaf0",
    desc: "Menggali regulasi & referensi hukum agar analisis tetap akurat.",
  },
  {
    name: "Rafelya",
    role: "Researcher",
    initials: "RF",
    accent: "#534ab7",
    bg: "#eeedfe",
    desc: "Mendalami kasus-kasus hukum untuk memperkaya basis pengetahuan AI.",
  },
];

const values = [
  {
    icon: (
      <svg width="16" height="16" fill="none" stroke="#5a9e3a" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Hukum untuk Semua",
    desc: "Informasi hukum yang mudah dijangkau siapa pun, tanpa biaya.",
  },
  {
    icon: (
      <svg width="16" height="16" fill="none" stroke="#5a9e3a" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
      </svg>
    ),
    title: "Transparan & Jujur",
    desc: "Analisis berbasis regulasi resmi Indonesia, bukan asumsi.",
  },
  {
    icon: (
      <svg width="16" height="16" fill="none" stroke="#5a9e3a" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Cepat & Praktis",
    desc: "Analisis kasus hukum dalam hitungan detik, kapan saja.",
  },
];

export default function AboutUs() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    cardsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLDivElement | null, i: number) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      className="min-h-screen pt-20 font-sans"
      style={{
        background: "linear-gradient(160deg, #fdfef9 0%, #f4faea 50%, #eaf5d6 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <Navbar />

      {/* ── HERO ── */}
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-14 text-center">
        {/* Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-medium tracking-wider mb-6 border border-[#b5dea0] bg-[#f0f7e8] text-[#3a7022]">
          <span className="w-[7px] h-[7px] rounded-full bg-[#5a9e3a]" />
          Tentang Kami
        </div>

        <h1
          className="text-4xl md:text-6xl text-[#2d5a1e] leading-tight mb-5 font-normal"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Hukum Jadi Lebih<br />
          <span className="text-[#5a9e3a]">Mudah Dipahami</span>
        </h1>

        <p className="text-base text-[#555] leading-relaxed max-w-xl mx-auto mb-10">
          HakKita hadir untuk menjembatani masyarakat Indonesia dengan dunia hukum
          yang seringkali terasa rumit dan jauh. Kami percaya bahwa setiap orang
          berhak memahami hak-haknya — tanpa harus jadi sarjana hukum dulu.
        </p>

        {/* Decorative line */}
        <div
          className="w-12 h-[3px] rounded-full mx-auto mb-14"
          style={{ background: "linear-gradient(90deg, #9dcc6b, #5a9e3a)" }}
        />
      </div>

      {/* ── VALUES ── */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <p className="text-[11px] font-medium text-[#5a9e3a] tracking-[0.09em] uppercase text-center mb-7">
          Apa yang kami percaya
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white border border-[#e0eed4] rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#5a9e3a]/10"
            >
              <div className="w-9 h-9 rounded-full bg-[#f0f7e8] flex items-center justify-center mb-3">
                {v.icon}
              </div>
              <div className="text-sm font-medium text-[#1a1a1a] mb-1">{v.title}</div>
              <div className="text-[13px] text-[#777] leading-relaxed">{v.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TEAM ── */}
      <div className="bg-white border-t border-b border-[#e8f4da] py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-medium text-[#5a9e3a] tracking-[0.09em] uppercase text-center mb-7">
            Tim di balik layar
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {team.map((m, i) => (
              <div
                key={i}
                className="bg-[#fafdf7] border border-[#e0eed4] rounded-2xl px-4 py-6 text-center"
                ref={(el) => addRef(el, i)}
                style={{
                  opacity: 0,
                  transform: "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms, box-shadow 0.2s`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(90,158,58,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <div
                  className="w-13 h-13 rounded-full flex items-center justify-center text-sm font-medium mx-auto mb-3"
                  style={{ background: m.bg, color: m.accent, width: 52, height: 52 }}
                >
                  {m.initials}
                </div>
                <div className="text-sm font-medium text-[#1a1a1a] mb-1">{m.name}</div>
                <span
                  className="inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-medium mb-2.5"
                  style={{ background: m.bg, color: m.accent }}
                >
                  {m.role}
                </span>
                <div className="text-xs text-[#888] leading-relaxed">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
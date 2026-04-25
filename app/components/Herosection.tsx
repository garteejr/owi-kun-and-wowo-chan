"use client";
import { useRouter } from "next/navigation";
import HeroIllustration from "../components/Heroillustration";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="w-full min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#fdfef9] via-[#f8fcf0] to-[#eef7e2]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:gap-16 min-h-[calc(100vh-80px)]">

        {/* Kiri: Teks */}
        <div className="flex flex-col items-start justify-center text-center sm:text-left items-center sm:items-start">

          {/* Heading */}
          <h1 className="font-['DM_Serif_Display'] text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.1] tracking-tight text-[#2d5a1e] mb-5">
            Masalah Hukum{" "}
            <br className="hidden sm:block" />
            <span className="text-[#5a9e3a]">Apa Yang Sedang</span>
            <br />
            Menghampirimu?
          </h1>

          {/* Deskripsi */}
          <p className="text-base sm:text-[1.05rem] text-[#555] leading-relaxed font-normal mb-8 max-w-md">
            Panduan hukum lengkap dalam satu portal —{" "}
            <strong className="text-[#2d5a1e] font-semibold">
              analisis kasus, kalkulator sanksi, to-do list
            </strong>{" "}
            peraturan, hingga{" "}
            <strong className="text-[#2d5a1e] font-semibold">
              AI legal assistant
            </strong>{" "}
            dan lainnya.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => router.push("/analysis")}
              className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#5a9e3a] text-white text-[0.95rem] font-bold shadow-[0_4px_20px_rgba(90,158,58,0.3)] hover:bg-[#4a8a2a] hover:shadow-[0_6px_28px_rgba(90,158,58,0.45)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
            >
              Mulai
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
                width={18}
                height={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

          </div>
        </div>

        {/* Kanan: Ilustrasi */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative w-full max-w-lg">
            {/* Glow dekoratif */}
            <div className="absolute inset-0 -z-10 rounded-3xl bg-[#c8eab4]/30 blur-3xl scale-90" />
            <HeroIllustration />
          </div>
        </div>

      </div>
    </section>
  );
}
"use client";
import { useRouter } from "next/navigation";
import HeroIllustration from "../components/Heroillustration";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#fdfef9] via-[#f6fbef] to-[#eef7e2] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#c8eab4]/40 blur-[120px] rounded-full animate-pulseSlow" />
      <div className="absolute bottom-[-120px] right-[-80px] w-[320px] h-[320px] bg-[#a3d977]/30 blur-[120px] rounded-full animate-pulseSlow delay-200" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-6 py-20 sm:px-10 lg:px-16 min-h-screen">

        {/* LEFT */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">

          {/* Heading */}
          <h1 className="font-['DM_Serif_Display'] text-[clamp(2.6rem,5vw,4.6rem)] leading-[1.05] tracking-tight text-[#1f3d16] mb-6 animate-fadeUp delay-100">

            Masalah Hukum
            <br className="hidden sm:block" />

            <span className="bg-gradient-to-r from-[#5a9e3a] via-[#84cc16] to-[#a3e635] bg-[length:200%_200%] animate-gradientMove bg-clip-text text-transparent">
              Apa Yang Sedang
            </span>

            <br />

            <span className="relative inline-block group">
              Menghampirimu?
              <span className="absolute -bottom-1 left-0 w-full h-[6px] bg-[#c8eab4] rounded-full blur-sm group-hover:h-[10px] transition-all duration-300" />
            </span>

          </h1>

          {/* Description */}
          <p className="text-[1rem] sm:text-[1.1rem] text-[#4b5563] leading-relaxed font-light mb-8 max-w-md animate-fadeUp delay-200">
            Semua yang kamu butuhkan untuk memahami hukum —
            <span className="font-semibold text-[#2d5a1e] hover:text-[#5a9e3a] transition-colors"> analisis kasus</span>,
            <span className="font-semibold text-[#2d5a1e] hover:text-[#5a9e3a] transition-colors"> kalkulator sanksi</span>,
            <span className="font-semibold text-[#2d5a1e] hover:text-[#5a9e3a] transition-colors"> to-do peraturan</span>,
            hingga
            <span className="font-semibold text-[#2d5a1e] hover:text-[#5a9e3a] transition-colors"> AI legal assistant</span>.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-fadeUp delay-300">

            {/* Primary */}
            <button
              onClick={() => router.push("/analysis")}
              className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#5a9e3a] text-white text-[0.95rem] font-semibold shadow-[0_6px_24px_rgba(90,158,58,0.35)] hover:bg-[#4a8a2a] hover:shadow-[0_10px_32px_rgba(90,158,58,0.45)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
            >
              Mulai Sekarang
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

            {/* Secondary */}
            <button className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-[#d4e8c7] text-[#2d5a1e] text-[0.9rem] font-medium hover:bg-[#f3f9ec] transition-all duration-200">
              Pelajari Dulu
            </button>

          </div>

        </div>

        {/* RIGHT */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative w-full max-w-lg">

            {/* Glow */}
            <div className="absolute inset-0 -z-10 rounded-3xl bg-[#c8eab4]/30 blur-3xl scale-90" />

            {/* Floating Illustration */}
            <div className="animate-float">
              <HeroIllustration />
            </div>

          </div>
        </div>

      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes pulseSlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fadeUp {
          animation: fadeUp 0.8s ease forwards;
        }

        .delay-100 { animation-delay: 0.15s; }
        .delay-200 { animation-delay: 0.3s; }
        .delay-300 { animation-delay: 0.45s; }

        .animate-gradientMove {
          animation: gradientMove 5s ease infinite;
        }

        .animate-pulseSlow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
      `}</style>

    </section>
  );
}
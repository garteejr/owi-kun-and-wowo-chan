"use client";

import Navbar from "./components/Navbar";
import HeroSection from "./components/Herosection";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fdfef9] via-[#f8fcf0] to-[#eef7e2] overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION 1 */}
      <HeroSection />

      {/* HERO SECTION 2 */}
      <section className="relative w-full min-h-screen bg-gradient-to-br from-[#fdfef9] via-[#f6fbef] to-[#eef7e2] overflow-hidden">

        {/* Glow */}
        <div className="absolute top-[-120px] left-[-80px] w-[320px] h-[320px] bg-[#c8eab4]/40 blur-[120px] rounded-full animate-pulseSlow" />
        <div className="absolute bottom-[-120px] right-[-80px] w-[320px] h-[320px] bg-[#a3d977]/30 blur-[120px] rounded-full animate-pulseSlow delay-200" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-6 py-20 sm:px-10 lg:px-16 min-h-screen">

          {/* LEFT IMAGE */}
          <div className="flex justify-center order-1">
            <div className="relative w-full max-w-md animate-float">

              <div className="absolute inset-0 -z-10 rounded-full bg-[#c8eab4]/30 blur-3xl scale-90" />

              <Image
                src="/owl-law.webp"
                alt="Legal Owl"
                width={500}
                height={500}
                className="w-full h-auto drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2">

            <h2 className="font-['DM_Serif_Display'] text-[clamp(2.5rem,5vw,4.4rem)] leading-[1.05] tracking-tight text-[#1f3d16] mb-6 animate-fadeUp delay-100">

              Cari Bantuan
              <br className="hidden sm:block" />

              <span className="bg-gradient-to-r from-[#5a9e3a] via-[#84cc16] to-[#a3e635] bg-[length:200%_200%] animate-gradientMove bg-clip-text text-transparent">
                Hukum Dengan
              </span>

              <br />

              <span className="relative inline-block group">
                Cepat & Mudah
                <span className="absolute -bottom-1 left-0 w-full h-[6px] bg-[#c8eab4] rounded-full blur-sm group-hover:h-[10px] transition-all duration-300" />
              </span>

            </h2>

            <p className="text-[1rem] sm:text-[1.08rem] text-[#4b5563] leading-relaxed font-light mb-8 max-w-md animate-fadeUp delay-200">
              Temukan
              <span className="font-semibold text-[#2d5a1e]"> LBH</span>,
              <span className="font-semibold text-[#2d5a1e]"> Posbakum</span>,
              dan konsultasi hukum langsung dari kota Anda.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-fadeUp delay-300">

              <button
                onClick={() => router.push("/bantuan-hukum")}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#5a9e3a] text-white text-[0.95rem] font-semibold shadow-[0_6px_24px_rgba(90,158,58,0.35)] hover:bg-[#4a8a2a] hover:-translate-y-0.5 transition-all duration-200"
              >
                Cari Sekarang
              </button>

              <button className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#d4e8c7] text-[#2d5a1e] text-[0.9rem] font-medium hover:bg-[#f3f9ec] transition-all duration-200">
                Pelajari Dulu
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* STYLE */}
      <style jsx>{`
        @keyframes float {
          0%,100% { transform: translateY(0px); }
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
          0%,100% { opacity: .6; }
          50% { opacity: 1; }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fadeUp {
          animation: fadeUp .8s ease forwards;
        }

        .delay-100 { animation-delay: .15s; }
        .delay-200 { animation-delay: .3s; }
        .delay-300 { animation-delay: .45s; }

        .animate-gradientMove {
          animation: gradientMove 5s ease infinite;
        }

        .animate-pulseSlow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
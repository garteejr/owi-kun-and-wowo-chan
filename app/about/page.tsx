"use client";

import { useState, useEffect, useRef } from "react";

const team = [
  {
    id: "01",
    initials: "AR",
    name: "Ahmad Rizky",
    role: "Team Lead",
    bio: "Visioner di balik arah tim. Memastikan semua bagian bergerak seirama menuju satu tujuan yang besar.",
    tag: "Leadership",
    color: "from-indigo-950 to-indigo-900",
    accent: "text-indigo-300",
    border: "border-indigo-800/40",
  },
  {
    id: "02",
    initials: "SN",
    name: "Sari Nurhayati",
    role: "UI/UX Designer",
    bio: "Menuangkan ide menjadi tampilan yang indah dan fungsional. Percaya bahwa desain terbaik tidak terlihat.",
    tag: "Design",
    color: "from-rose-950 to-rose-900",
    accent: "text-rose-300",
    border: "border-rose-800/40",
  },
  {
    id: "03",
    initials: "DP",
    name: "Dimas Pratama",
    role: "Frontend Dev",
    bio: "Mengubah pixel menjadi kenyataan. Selalu mencari cara paling elegan untuk membangun antarmuka.",
    tag: "Engineering",
    color: "from-emerald-950 to-emerald-900",
    accent: "text-emerald-300",
    border: "border-emerald-800/40",
  },
  {
    id: "04",
    initials: "RA",
    name: "Rina Andriani",
    role: "Backend Dev",
    bio: "Penjaga fondasi sistem. Membangun arsitektur yang kuat, aman, dan siap untuk skalabilitas tinggi.",
    tag: "Engineering",
    color: "from-amber-950 to-amber-900",
    accent: "text-amber-300",
    border: "border-amber-800/40",
  },
  {
    id: "05",
    initials: "BH",
    name: "Bayu Hermawan",
    role: "Project Manager",
    bio: "Memastikan setiap milestone tercapai tepat waktu. Penghubung antara tim dan klien.",
    tag: "Management",
    color: "from-cyan-950 to-cyan-900",
    accent: "text-cyan-300",
    border: "border-cyan-800/40",
  },
];

const stats = [
  { value: "5", label: "Anggota Tim" },
  { value: "3+", label: "Tahun Berdiri" },
  { value: "20+", label: "Proyek Selesai" },
  { value: "100%", label: "Komitmen" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function TeamCard({ member, index }: { member: (typeof team)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className="group relative cursor-default"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        transitionDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative h-full rounded-2xl border bg-gradient-to-b p-6 transition-all duration-500 ${member.color} ${member.border} ${
          hovered ? "scale-[1.02] shadow-2xl shadow-black/50" : "scale-100"
        }`}
      >
        {/* Number */}
        <span className="mb-5 block font-mono text-[11px] tracking-[0.25em] text-white/25">
          {member.id} / 05
        </span>

        {/* Avatar */}
        <div
          className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-xl font-bold backdrop-blur-sm transition-transform duration-300 ${
            hovered ? "scale-110" : ""
          } ${member.accent}`}
        >
          {member.initials}
        </div>

        {/* Info */}
        <h3 className="mb-1 font-serif text-xl font-bold text-white">
          {member.name}
        </h3>
        <p className={`mb-3 text-[11px] font-medium uppercase tracking-[0.18em] ${member.accent}`}>
          {member.role}
        </p>
        <p className="text-sm leading-relaxed text-white/50">{member.bio}</p>

        {/* Tag */}
        <div className="mt-5">
          <span
            className={`inline-block rounded-full border px-3 py-1 text-[10px] uppercase tracking-wider ${member.border} ${member.accent} bg-white/5`}
          >
            {member.tag}
          </span>
        </div>

        {/* Hover glow */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(ellipse at top left, rgba(255,255,255,0.05) 0%, transparent 60%)",
          }}
        />
      </div>
    </div>
  );
}

export default function AboutUs() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-white/20">
      {/* Custom font via CDN */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', Georgia, serif !important; }
        body { font-family: 'DM Sans', sans-serif; }
        ::selection { background: rgba(255,255,255,0.15); }
        .grain::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 50;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 200px;
        }
      `}</style>

      <div className="grain">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden px-6 pb-20 pt-24 text-center">
          {/* Background orb */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
            style={{ background: "radial-gradient(ellipse, #6366f1 0%, transparent 70%)" }}
          />

          <div
            className="transition-all duration-1000"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(24px)" }}
          >
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
              — Meet the team —
            </p>
            <h1 className="font-serif text-[clamp(3.5rem,12vw,8rem)] font-bold leading-[0.9] text-white">
              Tentang<br />
              <em className="text-white/40">Kami</em>
            </h1>
            <div className="mx-auto mt-6 h-px w-16 bg-white/20" />
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/40">
              Lima individu dengan keahlian berbeda, bersatu dalam satu misi yang sama — membangun sesuatu yang berarti.
            </p>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <AnimatedSection className="border-y border-white/5 bg-white/[0.02]">
          <div className="mx-auto grid max-w-4xl grid-cols-2 divide-x divide-y divide-white/5 sm:grid-cols-4 sm:divide-y-0">
            {stats.map((s) => (
              <div key={s.label} className="px-8 py-8 text-center">
                <div className="font-serif text-4xl font-bold text-white">{s.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/30">{s.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ── Team Grid ── */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <AnimatedSection className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/30">
                Tim kami
              </p>
              <h2 className="font-serif text-4xl font-bold text-white">
                The Crew
              </h2>
            </div>
            <span className="text-right text-sm text-white/20">5 orang · 1 tujuan</span>
          </AnimatedSection>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.slice(0, 3).map((m, i) => (
              <TeamCard key={m.id} member={m} index={i} />
            ))}
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {team.slice(3).map((m, i) => (
              <TeamCard key={m.id} member={m} index={i + 3} />
            ))}
          </div>
        </section>

        {/* ── Values ── */}
        <section className="border-t border-white/5 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <AnimatedSection className="mb-12 text-center">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/30">
                Yang kami pegang
              </p>
              <h2 className="font-serif text-4xl font-bold text-white">Nilai Kami</h2>
            </AnimatedSection>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { icon: "◈", title: "Kolaborasi", desc: "Kami percaya hasil terbaik lahir dari kerja sama yang tulus dan saling menghargai." },
                { icon: "◇", title: "Inovasi", desc: "Tidak takut mencoba hal baru. Selalu mencari cara yang lebih baik dari kemarin." },
                { icon: "◉", title: "Integritas", desc: "Apa yang kami janjikan, kami tepati. Kepercayaan adalah fondasi segalanya." },
              ].map((v, i) => (
                <AnimatedSection key={v.title} delay={i * 120}>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-colors duration-300 hover:bg-white/[0.06]">
                    <div className="mb-4 text-2xl text-white/20">{v.icon}</div>
                    <h3 className="mb-2 font-serif text-xl font-bold text-white">{v.title}</h3>
                    <p className="text-sm leading-relaxed text-white/40">{v.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quote / CTA ── */}
        <AnimatedSection>
          <section className="border-t border-white/5 px-6 py-24 text-center">
            <blockquote className="mx-auto max-w-2xl">
              <p className="font-serif text-[clamp(1.4rem,4vw,2.2rem)] font-semibold italic leading-snug text-white/60">
                "Bukan tentang siapa yang paling hebat,{" "}
                <span className="text-white">
                  tapi bagaimana kita saling menguatkan.
                </span>"
              </p>
              <footer className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-white/20">
                — Tim Kami
              </footer>
            </blockquote>
          </section>
        </AnimatedSection>

      </div>
    </div>
  );
}
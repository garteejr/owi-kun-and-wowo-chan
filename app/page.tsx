"use client";

import Navbar from "./components/Navbar";
import HeroSection from "./components/Herosection";

export default function Home() {
  return (
    <div className="min-h-screenbg-gradient-to-br from-[#fdfef9] via-[#f8fcf0] to-[#eef7e2]">
      <Navbar />
      <HeroSection />
    </div>
  );
}
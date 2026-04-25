"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLink = (href: string, label: string) => {
    const active = pathname === href;

    return (
      <a
        href={href}
        className={`text-[1rem] transition
        ${active ? "text-[#3a8a2a] font-semibold" : "text-[#222]"}
        hover:text-[#3a8a2a]`}
      >
        {label}
      </a>
    );
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 fixed top-0 w-full z-50
      bg-transparent">

        {/* LEFT - LOGO */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-[#3a8a2a] flex items-center justify-center">
            <span className="text-white text-sm font-semibold">WC</span>
          </div>

          <span className="text-[1.4rem] font-semibold text-[#111]">
            Wowocare
          </span>
        </div>

        {/* RIGHT - MENU + PROFILE */}
        <div className="flex items-center gap-6">

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLink("/", "Home")}
            {navLink("/about", "About")}
          </div>

          {/* Profile */}
          <button className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md 
          flex items-center justify-center shadow-sm hover:bg-white transition">
            <svg width="18" height="18" fill="#3a8a2a" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col gap-[5px]"
          >
            <span className="w-6 h-[2px] bg-black" />
            <span className="w-6 h-[2px] bg-black" />
            <span className="w-6 h-[2px] bg-black" />
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition
        ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/30"
          onClick={() => setMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute top-0 left-0 h-full w-[75%] max-w-xs bg-white
          transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Header */}
          <div className="p-5 border-b flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3a8a2a] flex items-center justify-center text-white font-bold">
              WC
            </div>
            <span className="font-semibold text-lg">Wowocare</span>
          </div>

          {/* Menu */}
          <div className="flex flex-col p-3">
            <a className="px-4 py-3 rounded-lg hover:bg-[#f5f5f5]">Home</a>
            <a className="px-4 py-3 rounded-lg hover:bg-[#f5f5f5]">About</a>
          </div>
        </div>
      </div>
    </>
  );
}
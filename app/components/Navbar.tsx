"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import WowocareIcon from "./WowocareIcon";
import { useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 fixed top-0 w-full z-50 bg-transparent">
        <div className="flex items-center gap-2">
          <WowocareIcon size={36} />
          <span className="text-2xl font-semibold tracking-tight text-[#111]">
            Wowocare
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <a
              href="/"
              className={
                pathname === "/"
                  ? "text-[#2e7d32] font-semibold"
                  : "text-[#222] hover:text-[#2e7d32]"
              }
            >
              Home
            </a>
            <a
              href="/about"
              className={
                pathname === "/about"
                  ? "text-[#2e7d32] font-semibold"
                  : "text-[#222] hover:text-[#2e7d32]"
              }
            >
              About
            </a>
            <a
              href="/analysis"
              className={
                pathname === "/analysis"
                  ? "text-[#2e7d32] font-semibold"
                  : "text-[#222] hover:text-[#2e7d32]"
              }
            >
              Analysis
            </a>
            <a
              href="/report"
              className={
                pathname === "/report"
                  ? "text-[#2e7d32] font-semibold"
                  : "text-[#222] hover:text-[#2e7d32]"
              }
            >
              Report
            </a>
          </div>

          <button className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center shadow-sm hover:bg-white transition overflow-hidden">
            {user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt={user.fullName ?? "User"}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg width="18" height="18" fill="#2e7d32" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            )}
          </button>

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

      <div
        className={
          menuOpen
            ? "fixed inset-0 z-50 md:hidden transition-all duration-300 visible opacity-100"
            : "fixed inset-0 z-50 md:hidden transition-all duration-300 invisible opacity-0"
        }
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={
            menuOpen
              ? "absolute top-0 left-0 h-full w-[78%] max-w-xs bg-white shadow-2xl transition-transform duration-300 translate-x-0"
              : "absolute top-0 left-0 h-full w-[78%] max-w-xs bg-white shadow-2xl transition-transform duration-300 -translate-x-full"
          }
        >
          <div className="p-5 border-b flex items-center gap-3">
            <WowocareIcon size={36} />
            <span className="font-semibold text-lg text-[#111]">Wowocare</span>
          </div>

          <div className="flex flex-col p-4 gap-1">
            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              className={
                pathname === "/"
                  ? "px-4 py-3 rounded-lg font-medium bg-[#e8f5e9] text-[#2e7d32]"
                  : "px-4 py-3 rounded-lg font-medium text-[#222] hover:bg-[#f5f5f5]"
              }
            >
              Home
            </a>
            <a
              href="/about"
              onClick={() => setMenuOpen(false)}
              className={
                pathname === "/about"
                  ? "px-4 py-3 rounded-lg font-medium bg-[#e8f5e9] text-[#2e7d32]"
                  : "px-4 py-3 rounded-lg font-medium text-[#222] hover:bg-[#f5f5f5]"
              }
            >
              About
            </a>
            <a
              href="/analysis"
              onClick={() => setMenuOpen(false)}
              className={
                pathname === "/analysis"
                  ? "px-4 py-3 rounded-lg font-medium bg-[#e8f5e9] text-[#2e7d32]"
                  : "px-4 py-3 rounded-lg font-medium text-[#222] hover:bg-[#f5f5f5]"
              }
            >
              Analysis
            </a>
            <a
              href="/report"
              onClick={() => setMenuOpen(false)}
              className={
                pathname === "/report"
                  ? "px-4 py-3 rounded-lg font-medium bg-[#e8f5e9] text-[#2e7d32]"
                  : "px-4 py-3 rounded-lg font-medium text-[#222] hover:bg-[#f5f5f5]"
              }
            >
              Report
            </a>
          </div>

          <div className="absolute bottom-0 w-full p-4 border-t">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#e8f5e9] overflow-hidden flex items-center justify-center">
                {user?.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt={user.fullName ?? "User"}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    width="18"
                    height="18"
                    fill="#2e7d32"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#333]">
                  {user?.fullName ?? user?.username ?? "My Account"}
                </p>
                <p className="text-xs text-[#777]">
                  {user?.primaryEmailAddress?.emailAddress ??
                    "Profile settings"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

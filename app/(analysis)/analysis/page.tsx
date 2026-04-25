"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputForm from "../../components/InputForm";
import ChatBox from "../../components/ChatBox";
import ResultCard from "../../components/ResultCard";
import Navbar from "../../components/Navbar";



interface FormInput {
  konteks: string;
  kronologi: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AnalisaPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: FormInput) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/legal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || json.error) {
        throw new Error(json.error ?? "Terjadi kesalahan pada server");
      }

      if (!json.result) {
        throw new Error("Server tidak mengembalikan hasil analisis");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: `Konteks: ${data.konteks}\nKronologi: ${data.kronologi}`,
        },
      ]);

      setResult(json.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowUp = async (question: string) => {
    setIsLoading(true);
    setError(null);

    setMessages((prev) => [...prev, { role: "user", content: question }]);

    try {
      const res = await fetch("/api/legal/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const json = await res.json();

      if (!res.ok || json.error) throw new Error(json.error ?? "Gagal");

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: json.answer },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f9f4] px-4 py-6 sm:px-6 sm:py-8">
      <div className="max-w-2xl mx-auto">

        {/* Back button */}
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e0e0e0] text-[#555] text-sm font-medium hover:border-[#9dcc6b] hover:text-[#3a7022] hover:shadow-[0_0_0_3px_rgba(157,204,107,0.12)] transition-all duration-200 mb-6"
        >
          <span className="w-[22px] h-[22px] rounded-full bg-[#f0f7e8] flex items-center justify-center flex-shrink-0">
            <svg width="10" height="10" fill="none" stroke="#5a9e3a" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Kembali
        </button>

        {/* Page header */}
        <div className="mb-6">
          <div className="flex items-center gap-1.5 text-[0.7rem] font-medium tracking-widest uppercase text-[#5a9e3a] mb-1">
            <span className="block w-4 h-[1.5px] bg-[#9dcc6b] rounded" />
            Solusi Hukum
          </div>
          <h1 className="font-['DM_Serif_Display'] text-[clamp(1.5rem,4vw,1.875rem)] text-[#111] font-normal tracking-tight">
            AI Legal Assistant
          </h1>
        </div>

        <InputForm onSubmit={handleSubmit} disabled={isLoading} />

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center gap-4 bg-white border border-[#e8f3d8] rounded-2xl px-5 py-4 my-4">
            <div className="w-9 h-9 rounded-full bg-[#f0f7e8] flex items-center justify-center flex-shrink-0">
              <div className="w-[18px] h-[18px] rounded-full border-2 border-[#c8e8a0] border-t-[#5a9e3a] animate-spin" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-[#1a1a1a]">
                Menganalisis kasus kamu
              </span>
              <span className="text-xs text-[#5a9e3a] flex items-center gap-1">
                Mohon tunggu sebentar
                <span className="flex items-center gap-0.5 ml-0.5">
                  <span className="w-1 h-1 rounded-full bg-[#9dcc6b] animate-bounce [animation-delay:0ms]" />
                  <span className="w-1 h-1 rounded-full bg-[#9dcc6b] animate-bounce [animation-delay:150ms]" />
                  <span className="w-1 h-1 rounded-full bg-[#9dcc6b] animate-bounce [animation-delay:300ms]" />
                </span>
              </span>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 bg-[#fef3f2] border border-[#f5c6c6] rounded-xl px-5 py-4 my-4">
            <div className="w-5 h-5 rounded-full bg-[#fde8e8] flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="10" height="10" fill="none" stroke="#a94040" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M12 8v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[0.8125rem] text-[#a94040] leading-relaxed">
              {error}
            </span>
          </div>
        )}

        {result && <ResultCard data={result} />}

        <ChatBox
          messages={messages}
          onFollowUp={handleFollowUp}
          isLoading={isLoading}
        />

      </div>
    </main>
  );
}
"use client";

import { useState } from "react";
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

      setResult(
        typeof json.result === "string" ? JSON.parse(json.result) : json.result,
      );
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
        body: JSON.stringify({ question, history: messages }),
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
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f7f9f4] px-4 pb-12 sm:px-6 flex items-center">
        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl px-10 py-8 flex flex-col items-center gap-5 mx-4 max-w-xs w-full">
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full border-4 border-[#e8f3d8]" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#5a9e3a] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="#5a9e3a"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 12h6M9 16h6M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-sm font-semibold text-[#1a1a1a]">
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
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <InputForm onSubmit={handleSubmit} disabled={isLoading} />

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 bg-[#fef3f2] border border-[#f5c6c6] rounded-xl px-5 py-4 my-4">
              <div className="w-5 h-5 rounded-full bg-[#fde8e8] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  width="10"
                  height="10"
                  fill="none"
                  stroke="#a94040"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 8v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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
    </>
  );
}

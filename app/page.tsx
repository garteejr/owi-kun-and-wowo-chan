"use client";

import { useState } from "react";
import InputForm from "./components/InputForm";
import ChatBox from "./components/ChatBox";
import ResultCard from "./components/ResultCard";

interface FormInput {
  konteks: string;
  kronologi: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
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

      // handleSubmit — jangan push assistant message ke chatbox
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
    <main className="min-h-screen text-gray-800 bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">AI Legal Assistant</h1>

      <InputForm onSubmit={handleSubmit} disabled={isLoading} />

      {isLoading && (
        <div className="mt-4 flex items-center gap-2 text-blue-600">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <span>Menganalisis kasus, mohon tunggu...</span>
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      {result && <ResultCard data={result} />}

      <ChatBox
        messages={messages}
        onFollowUp={handleFollowUp}
        isLoading={isLoading}
      />
    </main>
  );
}

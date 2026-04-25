"use client";

import { useState } from "react";
import InputForm from "./components/InputForm";
import ChatBox from "./components/ChatBox";
import ResultCard from "./components/ResultCard";

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (data: any) => {
    const res = await fetch("/api/legal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "user", content: data },
      { role: "assistant", content: json.result },
    ]);

    setResult(json.result);
  };

  return (
    <main className="min-h-screen text-gray-800 bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">AI Legal Assistant</h1>

      <InputForm onSubmit={handleSubmit} />

      <ChatBox messages={messages} />

      {result && <ResultCard data={result} />}
    </main>
  );
}

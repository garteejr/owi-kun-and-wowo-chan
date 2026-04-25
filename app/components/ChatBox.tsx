"use client";

import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatBoxProps {
  messages: Message[];
  onFollowUp: (question: string) => Promise<void>;
  isLoading?: boolean;
}

export default function ChatBox({ messages, onFollowUp, isLoading }: ChatBoxProps) {
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const question = input.trim();
    setInput("");
    await onFollowUp(question);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (messages.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow mb-4">
      <div className="p-4 max-h-96 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`inline-block p-2 rounded-lg text-sm max-w-[80%] whitespace-pre-wrap break-words ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.content} {/* ✅ langsung render content */}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-500 text-sm px-3 py-2 rounded-lg animate-pulse">
              AI sedang mengetik...
            </div>
          </div>
        )}
      </div>

      <div className="border-t p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tanya AI lebih lanjut..."
          disabled={isLoading}
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50 transition-colors"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
"use client";

import { useState, useRef, useEffect } from "react";

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
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

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
    <>
      <style>{STYLES}</style>
      <div className="cb-wrap">
        {/* Header */}
        <div className="cb-header">
          <div className="cb-avatar">
            <svg width="14" height="14" fill="#5a9e3a" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 13a7.97 7.97 0 0 1-5.6-2.3A4.98 4.98 0 0 1 11 16h2a4.98 4.98 0 0 1 4.6 1.7A7.97 7.97 0 0 1 12 20z" />
            </svg>
          </div>
          <span className="cb-name">AI Legal Assistant</span>
          <span className="cb-status">
            <span className="cb-status-dot" />
            Online
          </span>
        </div>

        {/* Messages */}
        <div className="cb-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`cb-msg ${msg.role === "user" ? "cb-msg-user" : "cb-msg-ai"}`}>
              <div className={`cb-bubble ${msg.role === "user" ? "cb-bubble-user" : "cb-bubble-ai"}`}>
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="cb-msg cb-msg-ai">
              <div className="cb-typing">
                <span className="cb-dot" />
                <span className="cb-dot" />
                <span className="cb-dot" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="cb-input-row">
          <input
            className="cb-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tanya AI lebih lanjut..."
            disabled={isLoading}
          />
          <button
            className="cb-send"
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            aria-label="Kirim"
          >
            <svg width="14" height="14" fill="none" stroke="#1a2e0e" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

  .cb-wrap {
    background: #fff;
    border: 0.5px solid #ebebeb;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 1rem;
    font-family: 'DM Sans', sans-serif;
  }

  .cb-header {
    padding: 0.875rem 1.25rem;
    border-bottom: 0.5px solid #f0f0f0;
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  .cb-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #f0f7e8;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .cb-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: #1a1a1a;
  }

  .cb-status {
    font-size: 0.7rem;
    color: #5a9e3a;
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .cb-status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #9dcc6b;
    animation: cb-pulse 2s ease-in-out infinite;
  }

  @keyframes cb-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .cb-messages {
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 280px;
    overflow-y: auto;
    scroll-behavior: smooth;
  }

  .cb-messages::-webkit-scrollbar { width: 4px; }
  .cb-messages::-webkit-scrollbar-track { background: transparent; }
  .cb-messages::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 4px; }

  .cb-msg {
    display: flex;
    max-width: 82%;
  }

  .cb-msg-user {
    align-self: flex-end;
  }

  .cb-msg-ai {
    align-self: flex-start;
  }

  .cb-bubble {
    padding: 0.625rem 0.875rem;
    border-radius: 1rem;
    font-size: 0.8125rem;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .cb-bubble-user {
    background: #9dcc6b;
    color: #1a2e0e;
    border-bottom-right-radius: 0.25rem;
  }

  .cb-bubble-ai {
    background: #fafafa;
    color: #333;
    border: 0.5px solid #ebebeb;
    border-bottom-left-radius: 0.25rem;
  }

  .cb-typing {
    display: flex;
    gap: 0.3rem;
    align-items: center;
    padding: 0.625rem 0.875rem;
    background: #fafafa;
    border: 0.5px solid #ebebeb;
    border-radius: 1rem;
    border-bottom-left-radius: 0.25rem;
  }

  .cb-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #9dcc6b;
    animation: cb-bounce 0.9s ease-in-out infinite;
  }

  .cb-dot:nth-child(2) { animation-delay: 0.15s; }
  .cb-dot:nth-child(3) { animation-delay: 0.3s; }

  @keyframes cb-bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-5px); }
  }

  .cb-input-row {
    padding: 0.75rem 1rem;
    border-top: 0.5px solid #f0f0f0;
    display: flex;
    gap: 0.625rem;
    align-items: center;
  }

  .cb-input {
    flex: 1;
    background: #fafafa;
    border: 0.5px solid #e0e0e0;
    border-radius: 999px;
    padding: 0.5rem 1rem;
    font-size: 0.8125rem;
    font-family: 'DM Sans', sans-serif;
    color: #1a1a1a;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .cb-input::placeholder { color: #bbb; }

  .cb-input:focus {
    border-color: #9dcc6b;
    box-shadow: 0 0 0 3px rgba(157, 204, 107, 0.15);
  }

  .cb-input:disabled { opacity: 0.5; }

  .cb-send {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #9dcc6b;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s, transform 0.15s;
  }

  .cb-send:hover { background: #8ec05a; }
  .cb-send:active { transform: scale(0.95); }
  .cb-send:disabled { opacity: 0.4; cursor: not-allowed; }
`;
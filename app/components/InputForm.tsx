"use client";

import { useState } from "react";

export default function InputForm({ onSubmit }: any) {
  const [konteks, setKonteks] = useState("");
  const [kronologi, setKronologi] = useState("");

  const handleSend = () => {
    if (!konteks || !kronologi) return;
    onSubmit({ konteks, kronologi });
    setKonteks("");
    setKronologi("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .if-card {
          background: #fff;
          border: 0.5px solid #ebebeb;
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1rem;
          font-family: 'DM Sans', sans-serif;
        }

        .if-header {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          margin-bottom: 1.25rem;
        }

        .if-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f0f7e8;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .if-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.1rem;
          color: #1a1a1a;
        }

        .if-field {
          margin-bottom: 0.875rem;
        }

        .if-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 500;
          color: #5a9e3a;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 0.375rem;
        }

        .if-input,
        .if-textarea {
          width: 100%;
          background: #fafafa;
          border: 0.5px solid #e0e0e0;
          border-radius: 10px;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          font-family: 'DM Sans', sans-serif;
          color: #1a1a1a;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          resize: none;
        }

        .if-input:focus,
        .if-textarea:focus {
          border-color: #9dcc6b;
          box-shadow: 0 0 0 3px rgba(157, 204, 107, 0.15);
        }

        .if-input::placeholder,
        .if-textarea::placeholder {
          color: #bbb;
        }

        .if-textarea {
          min-height: 90px;
          line-height: 1.6;
        }

        .if-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.5rem;
          border-radius: 999px;
          background: #9dcc6b;
          color: #1a2e0e;
          font-size: 0.875rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }

        .if-btn:hover {
          background: #8ec05a;
          transform: translateY(-1px);
        }

        .if-btn:active {
          transform: scale(0.97);
        }

        .if-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>

      <div className="if-card">
        <div className="if-header">
          <div className="if-icon">
            <svg width="16" height="16" fill="none" stroke="#5a9e3a" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 12h6M9 16h6M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" strokeLinecap="round" />
            </svg>
          </div>
          <span className="if-title">Ceritakan Masalahmu</span>
        </div>

        <div className="if-field">
          <label className="if-label">Konteks Masalah</label>
          <input
            className="if-input"
            type="text"
            placeholder="Contoh: penipuan online, sengketa kontrak..."
            value={konteks}
            onChange={(e) => setKonteks(e.target.value)}
          />
        </div>

        <div className="if-field">
          <label className="if-label">Kronologi</label>
          <textarea
            className="if-textarea"
            placeholder="Ceritakan kejadian secara runtut. Semakin detail, semakin akurat analisisnya..."
            value={kronologi}
            onChange={(e) => setKronologi(e.target.value)}
          />
        </div>

        <button
          className="if-btn"
          onClick={handleSend}
          disabled={!konteks || !kronologi}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Analisis Sekarang
        </button>
      </div>
    </>
  );
}
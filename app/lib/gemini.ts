// gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "./types";

const keys = [
  process.env.GEMINI_API_KEY_1!,
  process.env.GEMINI_API_KEY_2!,
  process.env.GEMINI_API_KEY_3!,
];

export async function runChat(prompt: string, history: Message[]) {
  const models = ["gemini-2.5-flash", "gemini-3.0-flash"];

  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < models.length; j++) {
      try {
        const genAI = new GoogleGenerativeAI(keys[i]);

        const model = genAI.getGenerativeModel({
          model: models[j],
        });

        const chat = model.startChat({
          history: history.map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
          })),
        });

        const result = await chat.sendMessage(prompt);
        const text = result.response.text();

        // debug
        console.log("FULL RESPONSE:", result.response);
        console.log("TEXT:", result.response.text());

        if (!text) throw new Error("Empty response");

        return text;
      } catch (err) {
        console.error(`Key ${i + 1} + Model ${models[j]} gagal`, err);
      }
    }
  }

  // ✅ WAJIB biar tidak undefined
  throw new Error("Semua API key & model gagal");
}

// ==========================
// MODE 1: ANALYZER
// ==========================
export async function analyzeLegal(prompt: string, history: Message[]) {
  const analyzerPrompt = `
Kamu adalah AI ANALYZER hukum.

Tugas:
- Identifikasi jenis masalah
- Kategori hukum
- Ringkasan inti masalah

Jawaban JSON:
{
  "jenis_masalah": "",
  "kategori_hukum": "",
  "ringkasan": ""
}

${prompt}
`;

  return runChat(analyzerPrompt, history);
}

// ==========================
// MODE 2: REASONER
// ==========================
export async function reasonLegal(prompt: string, history: Message[]) {
  const reasonerPrompt = `
Kamu adalah AI REASONER hukum.

Tugas:
- Analisis mendalam
- Identifikasi risiko
- Nilai kekuatan kasus

Jawaban JSON:
{
  "analisis": "",
  "risiko": [],
  "kekuatan_kasus": ""
}

${prompt}
`;

  return runChat(reasonerPrompt, history);
}

// ==========================
// MODE 3: PLANNER
// ==========================
export async function planLegal(prompt: string, history: Message[]) {
  const plannerPrompt = `
Kamu adalah AI PLANNER hukum.

Tugas:
- Berikan rekomendasi
- Buat langkah konkret step-by-step

Jawaban JSON:
{
  "rekomendasi": [],
  "next_steps": [
    {
      "step": 1,
      "aksi": "",
      "detail": ""
    }
  ],
  "pertanyaan_lanjutan": []
}

${prompt}
`;

  return runChat(plannerPrompt, history);
}

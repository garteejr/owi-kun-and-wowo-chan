// gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "./types";

const keys = [
  process.env.GEMINI_API_KEY_1!,
  process.env.GEMINI_API_KEY_2!,
  process.env.GEMINI_API_KEY_3!,
];

export async function runChat(prompt: string, history: Message[]) {
  const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"];

  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < models.length; j++) {
      try {
        const genAI = new GoogleGenerativeAI(keys[i]);
        const model = genAI.getGenerativeModel({
          model: models[j],
          // ✅ Paksa output JSON — tidak ada markdown fence lagi
          generationConfig: {
            responseMimeType: "application/json",
          },
        });

        const chat = model.startChat({
          history: history.map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
          })),
        });

        const result = await chat.sendMessage(prompt);
        const text = result.response.text();

        if (!text) throw new Error("Empty response");
        return text;
      } catch (err) {
        console.error(`Key ${i + 1} + Model ${models[j]} gagal`, err);
      }
    }
  }

  throw new Error("Semua API key & model gagal");
}

// Tambah fungsi ini di gemini.ts
export async function runChatPlain(prompt: string, history: Message[]) {
  const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"];

  for (let i = 0; i < keys.length; i++) {
    for (let j = 0; j < models.length; j++) {
      try {
        const genAI = new GoogleGenerativeAI(keys[i]);
        const model = genAI.getGenerativeModel({
          model: models[j],
          // ✅ Tidak ada responseMimeType — bebas return teks biasa
        });

        const chat = model.startChat({
          history: history.map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
          })),
        });

        const result = await chat.sendMessage(prompt);
        const text = result.response.text();
        if (!text) throw new Error("Empty response");
        return text;
      } catch (err) {
        console.error(`Key ${i + 1} + Model ${models[j]} gagal`, err);
      }
    }
  }

  throw new Error("Semua API key & model gagal");
}

// ==========================
// MODE 1: ANALYZER
// ==========================
export async function analyzeLegal(prompt: string, history: Message[]) {
  const analyzerPrompt = `
Kamu adalah AI ANALYZER hukum Indonesia.

Tugas:
- Identifikasi jenis masalah hukum
- Tentukan kategori hukum yang relevan
- Buat ringkasan inti masalah

Kembalikan HANYA JSON berikut, tanpa teks lain:
{
  "jenis_masalah": "string",
  "kategori_hukum": "string",
  "ringkasan": "string"
}

Input:
${prompt}
`;
  return runChat(analyzerPrompt, history);
}

// ==========================
// MODE 2: REASONER
// ==========================
export async function reasonLegal(prompt: string, history: Message[]) {
  const reasonerPrompt = `
Kamu adalah AI REASONER hukum Indonesia.

Tugas:
- Buat analisis hukum mendalam berdasarkan data analyzer
- Identifikasi risiko-risiko yang mungkin dihadapi
- Nilai kekuatan kasus (Sangat Kuat / Kuat / Sedang / Lemah / Sangat Lemah)

Kembalikan HANYA JSON berikut, tanpa teks lain:
{
  "analisis": "string",
  "risiko": ["string", "string"],
  "kekuatan_kasus": "string"
}

Input:
${prompt}
`;
  return runChat(reasonerPrompt, history);
}

// ==========================
// MODE 3: PLANNER
// ==========================
export async function planLegal(prompt: string, history: Message[]) {
  // ✅ Tambahkan prompt instruksi yang jelas
  const plannerPrompt = `
Kamu adalah AI PLANNER hukum Indonesia.

Tugas:
- Berikan rekomendasi tindakan hukum yang perlu diambil
- Susun langkah-langkah konkret yang harus dilakukan korban
- Ajukan pertanyaan lanjutan untuk memperjelas kasus

Kembalikan HANYA JSON berikut, tanpa teks lain:
{
  "rekomendasi": ["string", "string"],
  "next_steps": [
    { "aksi": "string", "detail": "string" }
  ],
  "pertanyaan_lanjutan": ["string", "string"],
  "emergency_contacts": [
    { "name": "Polisi (Darurat)", "href": "tel:110" },
    { "name": "Patroli Siber", "href": "https://patrolisiber.id" }
  ]
}

Input:
${prompt}
`;

  // ✅ Hapus guard yang salah — runChat return string, bukan object
  return runChat(plannerPrompt, history);
}

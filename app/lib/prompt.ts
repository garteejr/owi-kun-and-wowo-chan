import { Message, LegalInput } from "./types";

export function buildPrompt(input: LegalInput, history: Message[]) {
  const historyText = history
    .slice(-6) // 🔥 penting: batasi context biar stabil
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n");

  return `
Kamu adalah AI ANALISIS HUKUM INDONESIA.

⚠️ ATURAN KETAT:
- WAJIB output HANYA JSON VALID
- TIDAK BOLEH ada teks selain JSON
- TIDAK BOLEH markdown
- TIDAK BOLEH penjelasan tambahan

RIWAYAT:
${historyText}

INPUT USER:
Konteks: ${input.konteks}
Kronologi: ${input.kronologi}

TUGAS:
Analisis kasus hukum secara ringkas, jelas, dan sistematis.

FORMAT OUTPUT (WAJIB IKUT 100%):

{
  "jenis_masalah": "string",
  "kategori_hukum": "pidana | perdata | administrasi | siber | lainnya",
  "analisis": "string sederhana",
  "rekomendasi": ["string"],
  "next_steps": [
    {
      "step": number,
      "aksi": "string",
      "detail": "string"
    }
  ],
  "pertanyaan_lanjutan": ["string"]
}

RULES OUTPUT:
- semua field wajib ada
- jika tidak tahu → isi ""
- jangan tambahkan field baru
- jangan jelaskan apa pun
`;
}

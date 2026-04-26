import { Message, LegalInput } from "./types";

export function buildPrompt(input: LegalInput, history: Message[]): string {
  const historyText = history
    .slice(-6)
    .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n");

  return `
Kamu adalah AI ANALISIS HUKUM INDONESIA dengan akses ke Google Search.

⚠️ ATURAN KETAT:
- WAJIB output HANYA JSON VALID
- TIDAK BOLEH ada teks selain JSON
- TIDAK BOLEH markdown
- TIDAK BOLEH penjelasan tambahan

SAFETY LAYER — VALIDASI HUKUM:
Sebelum menganalisis, WAJIB gunakan Google Search untuk memvalidasi referensi perundang-undangan.
Prioritaskan sumber terpercaya:
  • jdih.go.id        → peraturan perundang-undangan nasional
  • peraturan.go.id   → database regulasi pemerintah
  • mahkamahagung.go.id → yurisprudensi & putusan MA

Contoh query: "UU ITE pasal 27 site:jdih.go.id"
Gunakan hasil pencarian untuk mengisi field "referensi_hukum" dengan data aktual.

RIWAYAT:
${historyText}

INPUT USER:
Konteks: ${input.konteks}
Kronologi: ${input.kronologi}

TUGAS:
1. Lakukan pencarian untuk mencari dasar hukum yang relevan
2. Analisis kasus berdasarkan hukum positif Indonesia yang telah divalidasi
3. Kembalikan hasil HANYA dalam format JSON di bawah

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
  "pertanyaan_lanjutan": ["string"],
  "referensi_hukum": [
    {
      "nama": "nama peraturan/UU/pasal",
      "url": "url sumber resmi",
      "relevansi": "kenapa relevan dengan kasus ini"
    }
  ]
}

RULES OUTPUT:
- semua field wajib ada termasuk referensi_hukum
- referensi_hukum HARUS diisi dari hasil pencarian, bukan dari memori model
- jika pencarian tidak menemukan hasil → referensi_hukum: []
- jangan tambahkan field baru
- jangan jelaskan apa pun
`.trim();
}

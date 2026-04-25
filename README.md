# ⚖️ AI Legal Assistant System

Sistem fullstack berbasis **Next.js + MongoDB + Google Gemini AI + Clerk Auth** untuk:

- Konsultasi perkara hukum berbasis AI
- Analisis otomatis kasus hukum
- Generate laporan perkara (PDF)
- Dashboard manajemen kasus
- Landing page SaaS modern

---

## 🚀 Tech Stack

### Frontend + Backend

- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Database

- MongoDB Atlas
- Mongoose ORM

### Authentication

- Clerk Auth

### AI Engine

- Google Gemini API
  - gemini-2.5-flash (chat realtime)
  - gemini-2.0-flash (lightweight fallback)
  - gemini-1.5-pro (deep analysis & report generation)

### PDF Generator

- pdf-lib

---

## 🧠 Core Features

### 1. AI Legal Consultation

- Chat dengan AI tentang kasus hukum
- Context-aware conversation (berbasis histori kasus)
- Real-time response

### 2. AI Case Analysis

- Input kronologi perkara
- AI menganalisis:
  - Ringkasan kasus
  - Jenis tindak pidana
  - Risiko hukum
  - Rekomendasi tindakan

### 3. AI Report Generator

- Generate laporan perkara otomatis
- Format profesional (instansi style)
- Export ke PDF

### 4. PDF Download System

- Generate laporan menggunakan `pdf-lib`
- Kop surat instansi
- Tanda tangan section
- Multi-page support

### 5. Dashboard System

- Manajemen kasus
- Riwayat analisis AI
- Download laporan

### 6. Landing Page

- Hero section modern
- Demo AI chat
- Feature showcase
- CTA login/register

---

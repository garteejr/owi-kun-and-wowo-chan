"use client";

interface NextStep {
  aksi: string;
  detail: string;
}

interface LegalResult {
  jenis_masalah?: string;
  analisis?: string;
  ringkasan?: string;
  risiko?: string[];
  rekomendasi?: string[];
  next_steps?: (NextStep | string)[];
  pertanyaan_lanjutan?: string[];
}

interface ResultCardProps {
  data: LegalResult | null | undefined;
}

function stripMarkdown(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1");
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 border-t pt-3">
      <h3 className="font-semibold text-gray-700 mb-1">{title}</h3>
      {children}
    </div>
  );
}

function renderNextStep(s: NextStep | string) {
  if (typeof s === "string") return stripMarkdown(s);

  const obj = s as any;
  const aksi = obj.aksi ?? obj.langkah ?? obj.tindakan ?? Object.values(obj)[0];
  const detail = obj.detail ?? obj.deskripsi ?? obj.keterangan ?? Object.values(obj)[1];

  return (
    <>
      <span className="font-medium">{String(aksi)}</span>
      {detail ? ` — ${String(detail)}` : ""}
    </>
  );
}

export default function ResultCard({ data }: ResultCardProps) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-gray-400 text-center">
        Belum ada hasil analisis.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-1">
      <h2 className="text-xl font-bold">Hasil Analisis</h2>

      {data.jenis_masalah && (
        <p><span className="font-semibold">Jenis Masalah:</span> {data.jenis_masalah}</p>
      )}

      {(data.analisis || data.ringkasan) && (
        <Section title="Analisis">
          <p className="text-gray-600 text-sm whitespace-pre-line">
            {data.analisis ?? data.ringkasan}
          </p>
        </Section>
      )}

      {!!data.risiko?.length && (
        <Section title="Risiko">
          <ul className="list-disc ml-5 space-y-1">
            {data.risiko.map((r, i) => (
              <li key={i} className="text-sm text-gray-600">{stripMarkdown(r)}</li>
            ))}
          </ul>
        </Section>
      )}

      {!!data.rekomendasi?.length && (
        <Section title="Rekomendasi">
          <ul className="list-disc ml-5 space-y-1">
            {data.rekomendasi.map((r, i) => (
              <li key={i} className="text-sm text-gray-600">{stripMarkdown(r)}</li>
            ))}
          </ul>
        </Section>
      )}

      {!!data.next_steps?.length && (
        <Section title="Langkah Selanjutnya">
          <ol className="list-decimal ml-5 space-y-1">
            {data.next_steps.map((s, i) => (
              <li key={i} className="text-sm text-gray-600">
                {renderNextStep(s)} {/* ✅ extracted ke fungsi terpisah */}
              </li>
            ))}
          </ol>
        </Section>
      )}

      {!!data.pertanyaan_lanjutan?.length && (
        <Section title="Pertanyaan Lanjutan">
          <ul className="list-disc ml-5 space-y-1">
            {data.pertanyaan_lanjutan.map((q, i) => (
              <li key={i} className="text-sm text-gray-500 italic">{q}</li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}
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

function renderNextStep(s: NextStep | string) {
  if (typeof s === "string") return stripMarkdown(s);

  const obj = s as any;
  const aksi = obj.aksi ?? obj.langkah ?? obj.tindakan ?? Object.values(obj)[0];
  const detail = obj.detail ?? obj.deskripsi ?? obj.keterangan ?? Object.values(obj)[1];

  return (
    <>
      <span className="font-medium text-neutral-900">{String(aksi)}</span>
      {detail && <span> — {String(detail)}</span>}
    </>
  );
}

export default function ResultCard({ data }: ResultCardProps) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="w-full bg-white border border-neutral-200 rounded-2xl p-8 text-center text-sm text-neutral-400">
        Belum ada hasil analisis.
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-medium mb-4">
        <span className="w-2 h-2 bg-green-600 rounded-full" />
        Analisis selesai
      </div>

      {/* Type */}
      {data.jenis_masalah && (
        <div className="text-sm text-green-700 font-medium mb-1">
          {data.jenis_masalah}
        </div>
      )}

      {/* Title */}
      <h2 className="font-serif text-xl md:text-2xl text-neutral-900 mb-3">
        Hasil Analisis
      </h2>

      {/* Desc */}
      {(data.analisis || data.ringkasan) && (
        <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
          {data.analisis ?? data.ringkasan}
        </p>
      )}

      {/* Risiko */}
      {!!data.risiko?.length && (
        <div className="mt-6">
          <div className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
            Risiko
          </div>
          <div className="flex flex-col gap-2">
            {data.risiko.map((r, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-100"
              >
                <span className="mt-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-xs font-semibold shrink-0">
                  !
                </span>
                <span className="text-sm text-red-800 leading-relaxed">
                  {stripMarkdown(r)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rekomendasi */}
      {!!data.rekomendasi?.length && (
        <div className="mt-6">
          <div className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
            Rekomendasi
          </div>
          <div className="flex flex-col gap-2">
            {data.rekomendasi.map((r, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-4 py-3 rounded-xl bg-green-50 border border-green-100"
              >
                <span className="mt-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-semibold shrink-0">
                  ✓
                </span>
                <span className="text-sm text-green-900 leading-relaxed">
                  {stripMarkdown(r)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Steps */}
      {!!data.next_steps?.length && (
        <div className="mt-6">
          <div className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-3">
            Langkah Selanjutnya
          </div>
          <div className="space-y-3">
            {data.next_steps.map((s, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-50 border border-green-200 text-xs text-green-700 font-medium shrink-0">
                  {i + 1}
                </div>
                <div className="text-sm text-neutral-600 leading-relaxed">
                  {renderNextStep(s)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pertanyaan */}
      {!!data.pertanyaan_lanjutan?.length && (
        <div className="mt-6">
          <div className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
            Pertanyaan Lanjutan
          </div>
          <div className="space-y-2">
            {data.pertanyaan_lanjutan.map((q, i) => (
              <div key={i} className="flex gap-2 text-sm text-neutral-500 italic">
                <span className="mt-1.5 w-1.5 h-1.5 bg-green-400 rounded-full shrink-0" />
                {q}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
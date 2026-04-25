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
  if (typeof s === "string") return <>{stripMarkdown(s)}</>;
  const obj = s as any;
  const aksi = obj.aksi ?? obj.langkah ?? obj.tindakan ?? Object.values(obj)[0];
  const detail = obj.detail ?? obj.deskripsi ?? obj.keterangan ?? Object.values(obj)[1];
  return (
    <>
      <strong style={{ color: "#1a1a1a", fontWeight: 500 }}>{String(aksi)}</strong>
      {detail ? ` — ${String(detail)}` : ""}
    </>
  );
}

export default function ResultCard({ data }: ResultCardProps) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <>
        <style>{STYLES}</style>
        <div className="rc-card rc-empty">Belum ada hasil analisis.</div>
      </>
    );
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="rc-card">
        <div className="rc-badge">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="#3a7022">
            <circle cx="4" cy="4" r="4" />
          </svg>
          Analisis selesai
        </div>

        {data.jenis_masalah && (
          <div className="rc-type">{data.jenis_masalah}</div>
        )}

        <h2 className="rc-title">Hasil Analisis</h2>

        {(data.analisis || data.ringkasan) && (
          <p className="rc-desc">{data.analisis ?? data.ringkasan}</p>
        )}

        {!!data.risiko?.length && (
          <>
            <div className="rc-divider" />
            <div className="rc-section-head">Risiko</div>
            <div className="rc-tag-list">
              {data.risiko.map((r, i) => (
                <span key={i} className="rc-tag rc-tag-risk">{stripMarkdown(r)}</span>
              ))}
            </div>
          </>
        )}

        {!!data.rekomendasi?.length && (
          <>
            <div className="rc-divider" />
            <div className="rc-section-head">Rekomendasi</div>
            <div className="rc-tag-list">
              {data.rekomendasi.map((r, i) => (
                <span key={i} className="rc-tag rc-tag-rec">{stripMarkdown(r)}</span>
              ))}
            </div>
          </>
        )}

        {!!data.next_steps?.length && (
          <>
            <div className="rc-divider" />
            <div className="rc-section-head">Langkah Selanjutnya</div>
            <div className="rc-step-list">
              {data.next_steps.map((s, i) => (
                <div key={i} className="rc-step-item">
                  <div className="rc-step-num">{i + 1}</div>
                  <div className="rc-step-text">{renderNextStep(s)}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {!!data.pertanyaan_lanjutan?.length && (
          <>
            <div className="rc-divider" />
            <div className="rc-section-head">Pertanyaan Lanjutan</div>
            <div className="rc-q-list">
              {data.pertanyaan_lanjutan.map((q, i) => (
                <div key={i} className="rc-q-item">
                  <div className="rc-q-dot" />
                  {q}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  .rc-card {
    background: #fff;
    border: 0.5px solid #ebebeb;
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    font-family: 'DM Sans', sans-serif;
  }

  .rc-empty {
    text-align: center;
    color: #bbb;
    font-size: 0.875rem;
    padding: 2.5rem 1.5rem;
  }

  .rc-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.25rem 0.75rem;
    background: #f0f7e8;
    border: 0.5px solid #c8e8a0;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 500;
    color: #3a7022;
    margin-bottom: 1rem;
  }

  .rc-type {
    font-size: 0.8125rem;
    font-weight: 500;
    color: #5a9e3a;
    margin-bottom: 0.375rem;
  }

  .rc-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.25rem;
    font-weight: 400;
    color: #1a1a1a;
    margin-bottom: 0.875rem;
  }

  .rc-desc {
    font-size: 0.875rem;
    color: #777;
    line-height: 1.75;
  }

  .rc-divider {
    height: 0.5px;
    background: #f0f0f0;
    margin: 1rem 0;
  }

  .rc-section-head {
    font-size: 0.75rem;
    font-weight: 500;
    color: #5a9e3a;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 0.625rem;
  }

  .rc-tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .rc-tag {
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 400;
  }

  .rc-tag-risk {
    background: #fef3f2;
    color: #a94040;
    border: 0.5px solid #f5c6c6;
  }

  .rc-tag-rec {
    background: #f0f7e8;
    color: #3a7022;
    border: 0.5px solid #c8e8a0;
  }

  .rc-step-list {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .rc-step-item {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
  }

  .rc-step-num {
    min-width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #f0f7e8;
    border: 0.5px solid #c8e8a0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 500;
    color: #3a7022;
    flex-shrink: 0;
    margin-top: 0.1rem;
  }

  .rc-step-text {
    font-size: 0.8125rem;
    color: #777;
    line-height: 1.6;
  }

  .rc-q-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .rc-q-item {
    display: flex;
    gap: 0.625rem;
    align-items: flex-start;
    font-size: 0.8125rem;
    color: #888;
    font-style: italic;
  }

  .rc-q-dot {
    min-width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #9dcc6b;
    margin-top: 0.45rem;
    flex-shrink: 0;
  }
`;
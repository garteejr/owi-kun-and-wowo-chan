"use client";

export default function ResultCard({ data }: any) {

function cleanText(text: string) {
  return text
    .replace(/\*\*/g, "")   // hapus bold **
    .replace(/\*/g, "")     // hapus *
    .replace(/`/g, "")      // hapus backtick
    .trim();
}

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-2">
        Hasil Analisis
      </h2>

      <p><b>Jenis Masalah:</b> {data.jenis_masalah}</p>
      <p><b>Kategori:</b> {data.kategori_hukum}</p>

      <div className="mt-3">
        <b>Analisis:</b>
        <p>{cleanText(data.analisis)}</p>
      </div>

      <div className="mt-3">
        <b>Rekomendasi:</b>
        <ul className="list-disc ml-5">
          {data.rekomendasi?.map((r: string, i: number) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

      <div className="mt-3">
        <b>Next Steps:</b>
        <ul className="list-decimal ml-5">
          {data.next_steps?.map((s: any, i: number) => (
            <li key={i}>
              <b>{s.aksi}</b> - {s.detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
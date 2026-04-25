"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

type FormData = {
  waktuKejadian: string;
  tempatKejadian: string;
  jenisTindakPidana: string;
  kronologi: string;
  bagaimanaTerjadi: string;
  terlapor: string;
  korban: string;
  barangBukti: string;
  tindakanDilakukan: string;
  dilaporkanPada: string;
  kepalaInstansi: string;
  namaPelapor: string;
  noTelepon: number | "";
};

const steps = [
  {
    title: "Detail Kejadian",
    subtitle: "Kapan dan di mana kejadian berlangsung",
    fields: ["waktuKejadian", "tempatKejadian", "jenisTindakPidana"],
  },
  {
    title: "Kronologi Kasus",
    subtitle: "Jelaskan kejadian secara runtut",
    fields: ["kronologi", "bagaimanaTerjadi"],
  },
  {
    title: "Pihak Terlibat",
    subtitle: "Pelaku dan korban",
    fields: ["terlapor", "korban"],
  },
  {
    title: "Bukti & Tindakan",
    subtitle: "Barang bukti dan langkah awal",
    fields: ["barangBukti", "tindakanDilakukan"],
  },
  {
    title: "Data Pelapor",
    subtitle: "Identitas pelapor",
    fields: ["dilaporkanPada", "kepalaInstansi", "namaPelapor", "noTelepon"],
  },
];

const meta: Record<string, any> = {
  waktuKejadian: { label: "Waktu Kejadian", type: "datetime-local" },
  tempatKejadian: { label: "Tempat Kejadian", type: "text" },
  jenisTindakPidana: { label: "Jenis Tindak Pidana", type: "text" },
  kronologi: { label: "Kronologi", type: "textarea" },
  bagaimanaTerjadi: { label: "Bagaimana Terjadi", type: "textarea" },
  terlapor: { label: "Terlapor", type: "text" },
  korban: { label: "Korban", type: "text" },
  barangBukti: { label: "Barang Bukti", type: "text" },
  tindakanDilakukan: { label: "Tindakan Dilakukan", type: "text" },
  dilaporkanPada: { label: "Waktu Pelaporan", type: "datetime-local" },
  kepalaInstansi: { label: "Instansi", type: "text" },
  namaPelapor: { label: "Nama Pelapor", type: "text" },
  noTelepon: { label: "Nomor Telepon", type: "number" },
};

const INPUT =
  "w-full rounded-xl px-4 py-3 text-sm text-black bg-[#f3f7ed] border border-[#cdddbd] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8aba5a]";

export default function ReportPage() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormData>({
    waktuKejadian: "",
    tempatKejadian: "",
    jenisTindakPidana: "",
    kronologi: "",
    bagaimanaTerjadi: "",
    terlapor: "",
    korban: "",
    barangBukti: "",
    tindakanDilakukan: "",
    dilaporkanPada: "",
    kepalaInstansi: "",
    namaPelapor: "",
    noTelepon: "",
  });

  const current = steps[step];
  const isFirst = step === 0;
  const isLast = step === steps.length - 1;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    });
  };

  const validateStep = () =>
    current.fields.every((field) => form[field as keyof FormData] !== "");

  const nextStep = () => {
    if (!validateStep()) {
      alert("Harap isi semua data.");
      return;
    }
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      alert("Harap isi semua data.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: JSON.stringify(form), history: [] }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "laporan-pengaduan.pdf";
      a.click();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9f4] flex flex-col">
      <Navbar />

      {/* MOBILE RESPONSIVE */}
      <main className="flex-1 px-3 sm:px-6 py-4 sm:py-8 flex items-start sm:items-center justify-center">
        <div className="w-full max-w-2xl bg-white border border-[#dde8d0] rounded-2xl shadow-xl overflow-hidden">

          {/* Progress */}
          <div className="h-1 bg-gray-100">
            <div
              className="h-full bg-[#5a9e3a] transition-all duration-500"
              style={{
                width: `${((step + 1) / steps.length) * 100}%`,
              }}
            />
          </div>

          {/* Header */}
          <div className="px-4 sm:px-6 py-5 border-b border-[#edf2e6]">
            <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#5a9e3a] uppercase">
              Form Pengaduan Resmi
            </p>

            <h1 className="text-xl sm:text-2xl font-bold text-[#1e3a10] mt-2">
              Laporan Tindak Pidana
            </h1>

            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Lengkapi formulir dengan data yang benar dan jelas.
            </p>
          </div>

          {/* Tabs */}
          <div className="overflow-x-auto scrollbar-hide border-b border-[#edf2e6]">
            <div className="flex gap-2 min-w-max px-3 py-3">
              {steps.map((item, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-full text-[11px] whitespace-nowrap ${
                    i === step
                      ? "bg-[#e8f4dd] text-[#2f6418] font-semibold"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="px-4 sm:px-6 py-5">
            <h2 className="text-base sm:text-lg font-semibold text-[#1e3a10]">
              {current.title}
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 mb-5">
              {current.subtitle}
            </p>

            <div className="space-y-4">
              {current.fields.map((field) => {
                const item = meta[field];
                const value = form[field as keyof FormData];

                return (
                  <div key={field}>
                    <label className="block text-xs sm:text-sm font-medium mb-2 text-[#355e1d]">
                      {item.label}
                    </label>

                    {item.type === "textarea" ? (
                      <textarea
                        rows={4}
                        name={field}
                        value={value as string}
                        onChange={handleChange}
                        className={`${INPUT} resize-none`}
                      />
                    ) : (
                      <input
                        type={item.type}
                        name={field}
                        value={value as string}
                        onChange={handleChange}
                        className={INPUT}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                disabled={isFirst}
                onClick={() => setStep((s) => s - 1)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-gray-300 text-sm text-gray-600 disabled:opacity-30"
              >
                Kembali
              </button>

              {isLast ? (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#5a9e3a] text-white text-sm"
                >
                  {loading ? "Loading..." : "Generate PDF"}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#9dcc6b] text-[#214d12] text-sm"
                >
                  Selanjutnya
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
}
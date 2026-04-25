"use client";

import { useState } from "react";

type FormData = {
  waktuKejadian: string;
  tempatKejadian: string;
  kronologi: string;
  terlapor: string;
  korban: string;
  bagaimanaTerjadi: string;
  dilaporkanPada: string;
  jenisTindakPidana: string;
  barangBukti: string;
  tindakanDilakukan: string;
  kepalaInstansi: string;
  namaPelapor: string;
  tanggalPelapor: string;
  noTelepon: number | "";
};

export default function ReportForm() {
  const [form, setForm] = useState<FormData>({
    waktuKejadian: "",
    tempatKejadian: "",
    kronologi: "",
    terlapor: "",
    korban: "",
    bagaimanaTerjadi: "",
    dilaporkanPada: "",
    jenisTindakPidana: "",
    barangBukti: "",
    tindakanDilakukan: "",
    kepalaInstansi: "",
    namaPelapor: "",
    tanggalPelapor: "",
    noTelepon: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]:
        type === "number"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    });
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: JSON.stringify(form),
        history: [],
      }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "laporan-pengaduan.pdf";
    a.click();
  };

  const fields = [
    {
      name: "waktuKejadian",
      label: "Waktu Kejadian",
      type: "datetime-local",
      placeholder: "Pilih tanggal dan jam kejadian",
    },
    {
      name: "tempatKejadian",
      label: "Tempat Kejadian",
      type: "text",
      placeholder: "Alamat lengkap lokasi kejadian",
    },
    {
      name: "kronologi",
      label: "Kronologi Kejadian",
      type: "textarea",
      placeholder: "Jelaskan kejadian secara detail dan runtut",
    },
    {
      name: "terlapor",
      label: "Identitas Terlapor (Pelaku)",
      type: "text",
      placeholder: "Nama / ciri-ciri pelaku jika diketahui",
    },
    {
      name: "korban",
      label: "Identitas Korban",
      type: "text",
      placeholder: "Nama korban atau pihak yang dirugikan",
    },
    {
      name: "dilaporkanPada",
      label: "Waktu Pelaporan",
      type: "datetime-local",
      placeholder: "Tanggal & jam laporan dibuat",
    },
    {
      name: "jenisTindakPidana",
      label: "Jenis Tindak Pidana",
      type: "text",
      placeholder: "Contoh: Pencurian, Penipuan, Penganiayaan",
    },
    {
      name: "barangBukti",
      label: "Barang Bukti",
      type: "text",
      placeholder: "Link Google Drive / JPG / MP4 / PDF",
    },
    {
      name: "tindakanDilakukan",
      label: "Tindakan yang Telah Dilakukan",
      type: "text",
      placeholder: "Langkah awal yang sudah dilakukan korban",
    },
    {
      name: "kepalaInstansi",
      label: "Instansi / Pihak Penerima Laporan",
      type: "text",
      placeholder: "Nama kantor / pejabat yang menerima laporan",
    },
    {
      name: "namaPelapor",
      label: "Nama Pelapor",
      type: "text",
      placeholder: "Nama lengkap pelapor",
    },
    {
      name: "noTelepon",
      label: "Nomor Telepon",
      type: "number",
      placeholder: "Nomor HP aktif",
    },
  ];

  return (
    <div className="p-6 max-w-2xl space-y-5 bg-white rounded-lg shadow">

      <h1 className="text-xl font-bold">
        Form Laporan Pengaduan
      </h1>

      {fields.map((field) => (
        <div key={field.name} className="space-y-1">
          
          {/* LABEL */}
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>

          {/* INPUT */}
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              className="border p-2 w-full rounded h-24 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          ) : (
            <input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              onChange={handleChange}
              className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400 outline-none"
            />
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 w-full rounded"
      >
        Generate PDF
      </button>
    </div>
  );
}
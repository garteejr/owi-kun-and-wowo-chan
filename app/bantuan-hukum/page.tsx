"use client";

import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";

const bantuanHukum = [
  {
    kota: "Jakarta",
    nama: "LBH Jakarta",
    alamat: "Jl. Diponegoro No.74, Jakarta Pusat",
    telp: "(021) 3145518",
    wa: "6221314518",
    mapsUrl: "https://www.google.com/maps/search/LBH+Jakarta+Jl+Diponegoro+No+74+Jakarta+Pusat",
    jenis: "LBH",
    buka: "Senin - Jumat, 08:00 - 17:00",
  },
  {
    kota: "Surabaya",
    nama: "LBH Surabaya",
    alamat: "Jl. Raya Darmo No.120, Surabaya",
    telp: "(031) 5678901",
    wa: "62315678901",
    mapsUrl: "https://www.google.com/maps/search/LBH+Surabaya+Jl+Raya+Darmo+No+120+Surabaya",
    jenis: "LBH",
    buka: "Senin - Jumat, 08:00 - 16:30",
  },
  {
    kota: "Bandung",
    nama: "LBH Bandung",
    alamat: "Jl. Asia Afrika No.10, Bandung",
    telp: "(022) 7654321",
    wa: "622276543212",
    mapsUrl: "https://www.google.com/maps/search/LBH+Bandung+Jl+Asia+Afrika+No+10+Bandung",
    jenis: "LBH",
    buka: "Senin - Jumat, 09:00 - 17:00",
  },
  {
    kota: "Medan",
    nama: "Posbakum Medan",
    alamat: "Jl. Gatot Subroto No.15, Medan",
    telp: "(061) 889900",
    wa: "6261889900",
    mapsUrl: "https://www.google.com/maps/search/Posbakum+Medan+Jl+Gatot+Subroto+No+15+Medan",
    jenis: "Posbakum",
    buka: "Senin - Jumat, 08:30 - 16:00",
  },
  {
    kota: "Semarang",
    nama: "LBH Semarang",
    alamat: "Jl. Pandanaran No.22, Semarang",
    telp: "(024) 778899",
    wa: "6224778899",
    mapsUrl: "https://www.google.com/maps/search/LBH+Semarang+Jl+Pandanaran+No+22+Semarang",
    jenis: "LBH",
    buka: "Senin - Jumat, 08:00 - 17:00",
  },
];

export default function BantuanHukumPage() {
  const [kota, setKota] = useState("");
  const [show, setShow] = useState(false);

  const hasil = useMemo(() => {
    return bantuanHukum.filter((item) =>
      item.kota.toLowerCase().includes(kota.toLowerCase())
    );
  }, [kota]);

  const handleWa = (wa: string, nama: string) => {
    const pesan = encodeURIComponent(
      `Halo, saya ingin berkonsultasi mengenai permasalahan hukum dengan ${nama}. Mohon bantuannya.`
    );
    window.open(`https://wa.me/${wa}?text=${pesan}`, "_blank");
  };

  const handleMaps = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fdfef9] via-[#f6fbef] to-[#eef7e2]">
      <Navbar />

      <div className="px-4 sm:px-6 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full bg-white border border-[#dfead2] text-xs font-semibold tracking-widest uppercase text-[#5a9e3a]">
              Bantuan Hukum
            </span>
            <h1 className="mt-5 text-3xl sm:text-5xl font-bold text-[#18320d] leading-tight">
              Cari LBH / Pengacara Terdekat
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-gray-500">
              Temukan bantuan hukum terpercaya sesuai kota Anda dengan cepat,
              mudah, dan gratis.
            </p>
          </div>

          {/* Search Box */}
          <div className="rounded-3xl bg-white border border-[#e5edd8] shadow-xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Masukkan kota, contoh: Surabaya"
                value={kota}
                onChange={(e) => setKota(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && setShow(true)}
                className="flex-1 rounded-2xl border border-[#dce7cf] bg-[#f8fbf3] px-5 py-4 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8aba5a]"
              />
              <button
                onClick={() => setShow(true)}
                className="rounded-2xl bg-[#5a9e3a] px-8 py-4 text-sm font-semibold text-white hover:bg-[#4b8b2d] transition-colors whitespace-nowrap"
              >
                Cari Sekarang
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Jakarta", "Surabaya", "Bandung", "Medan", "Semarang"].map((city) => (
                <button
                  key={city}
                  onClick={() => { setKota(city); setShow(true); }}
                  className="px-4 py-2 rounded-full text-xs bg-[#f5faee] border border-[#dfead2] text-[#426f28] hover:bg-[#eef7e2] transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {show && (
            <div className="mt-10 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#18320d]">Hasil Pencarian</h2>
                <span className="text-sm text-gray-500 bg-white border border-[#e5edd8] px-3 py-1 rounded-full">
                  {hasil.length} layanan ditemukan
                </span>
              </div>

              {hasil.length > 0 ? (
                <div className="space-y-4">
                  {hasil.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-3xl overflow-hidden border border-[#e6eed9] bg-white shadow-md hover:shadow-lg transition-shadow"
                    >
                      {/* Card Header */}
                      <div className="bg-gradient-to-r from-[#eef7e2] to-[#f8fbf3] px-6 py-5 border-b border-[#e6eed9] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-bold text-[#18320d]">{item.nama}</h3>
                          <p className="mt-1 text-sm text-[#5a9e3a] font-medium">
                            {item.jenis} • {item.kota}
                          </p>
                        </div>
                        <span className="w-fit px-4 py-1.5 rounded-full bg-white border border-[#dfead2] text-xs font-semibold text-[#426f28]">
                          ● Aktif
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        {/* Info Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                          <div className="rounded-2xl bg-[#f8fbf3] px-4 py-3 border border-[#edf3e5]">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#5a9e3a] mb-1">Alamat</p>
                            <p className="text-sm text-gray-700 leading-snug">📍 {item.alamat}</p>
                          </div>
                          <div className="rounded-2xl bg-[#f8fbf3] px-4 py-3 border border-[#edf3e5]">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#5a9e3a] mb-1">Telepon</p>
                            <p className="text-sm text-gray-700">☎️ {item.telp}</p>
                          </div>
                          <div className="rounded-2xl bg-[#f8fbf3] px-4 py-3 border border-[#edf3e5]">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#5a9e3a] mb-1">Jam Operasional</p>
                            <p className="text-sm text-gray-700">🕒 {item.buka}</p>
                          </div>
                        </div>

                        {/* Services */}
                        <div className="rounded-2xl border border-[#edf3e5] px-5 py-4 mb-5">
                          <p className="text-sm font-semibold text-[#18320d] mb-2">Layanan Tersedia</p>
                          <div className="flex flex-wrap gap-2">
                            {["Konsultasi Hukum", "Pendampingan Perkara", "Mediasi Sengketa", "Bantuan Dokumen"].map((layanan) => (
                              <span key={layanan} className="px-3 py-1 rounded-full text-xs bg-[#f5faee] border border-[#dfead2] text-[#426f28]">
                                {layanan}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          {/* Hubungi via WA */}
                          <button
                            onClick={() => handleWa(item.wa, item.nama)}
                            className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3 text-sm font-semibold text-white hover:bg-[#1ebe5d] transition-colors"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                              <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.968-1.418A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 0 1-4.104-1.14l-.294-.175-3.046.87.871-3.022-.192-.311A7.944 7.944 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
                            </svg>
                            Hubungi via WhatsApp
                          </button>

                          {/* Lihat Lokasi */}
                          <button
                            onClick={() => handleMaps(item.mapsUrl)}
                            className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-[#dfead2] py-3 text-sm font-semibold text-[#426f28] hover:bg-[#f5faee] transition-colors"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                              <circle cx="12" cy="10" r="3"/>
                            </svg>
                            Lihat di Google Maps
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl bg-red-50 border border-red-100 p-8 text-center">
                  <p className="text-2xl mb-2">🔍</p>
                  <p className="text-sm font-semibold text-red-600">Kota tidak ditemukan</p>
                  <p className="text-xs text-red-400 mt-1">Coba cari dengan nama kota lain.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
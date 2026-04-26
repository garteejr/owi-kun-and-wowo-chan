// types.ts
export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type LegalInput = {
  konteks: string;
  kronologi: string;
};

export type ReportInput = {
  waktuKejadian: string; // datetime-local string
  tempatKejadian: string;
  kronologi: string;
  terlapor: string;
  korban: string;
  dilaporkanPada: string; // datetime-local string
  jenisTindakPidana: string;
  barangBukti: string; // URL (Google Drive / JPG / MP4 / PDF)
  tindakanDilakukan: string;
  kepalaInstansi: string;
  namaPelapor: string;
  tanggalPelapor: string; // date string
  noTelepon: number | ""; // numeric input
};

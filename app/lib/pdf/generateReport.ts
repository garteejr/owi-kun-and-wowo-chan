import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { ReportInput } from "../types";

export async function generateReportPDF(data: ReportInput) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]); // A4

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const marginX = 50;
  const marginBottom = 60;
  const pageHeight = 842;

  let y = 780;

  const fontSize = 11;
  const lineHeight = 16;
  const maxWidth = 495;

  const checkPageBreak = () => {
    if (y <= marginBottom) {
      page = pdfDoc.addPage([595, 842]);
      y = 780;
    }
  };

  const wrapText = (text: string, size: number) => {
    const words = text.split(" ");
    let line = "";

    const lines: string[] = [];

    for (const word of words) {
      const testLine = line + word + " ";
      const width = font.widthOfTextAtSize(testLine, size);

      if (width > maxWidth) {
        lines.push(line);
        line = word + " ";
      } else {
        line = testLine;
      }
    }

    if (line) lines.push(line);

    return lines;
  };

  const drawText = (text: string, size = fontSize) => {
    const lines = wrapText(text, size);

    for (const line of lines) {
      checkPageBreak();

      page.drawText(line, {
        x: marginX,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
      });

      y -= lineHeight;
    }
  };

  // ================= HEADER =================
  drawText("KEPOLISIAN NEGARA REPUBLIK INDONESIA", 14);
  drawText("LAPORAN PENGADUAN TINDAK PIDANA", 12);

  y -= 10;

  page.drawLine({
    start: { x: marginX, y },
    end: { x: 545, y },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  y -= 20;

  // ================= CONTENT =================
  const lines = [
    `Waktu Kejadian: ${data.waktuKejadian}`,
    `Tempat Kejadian: ${data.tempatKejadian}`,
    `Kronologi: ${data.kronologi}`,
    `Terlapor: ${data.terlapor}`,
    `Korban: ${data.korban}`,
    `Dilaporkan Pada: ${data.dilaporkanPada}`,
    `Jenis Tindak Pidana: ${data.jenisTindakPidana}`,
    `Barang Bukti: ${data.barangBukti}`,
    `Tindakan: ${data.tindakanDilakukan}`,
    `Kepala Instansi: ${data.kepalaInstansi}`,
  ];

  for (const line of lines) {
    drawText(line);
    y -= 2;
  }

  y -= 10;

  drawText(`Pelapor: ${data.namaPelapor}`);
  drawText(`Tanggal: ${data.tanggalPelapor}`);
  drawText(`No HP: ${data.noTelepon}`);

  // ================= TTD =================
  y -= 40;

  page.drawLine({
    start: { x: 350, y },
    end: { x: 545, y },
    thickness: 1,
    color: rgb(0, 0, 0),
  });

  page.drawText("Tanda Tangan Pelapor", {
    x: 380,
    y: y - 15,
    size: 10,
    font,
  });

  return await pdfDoc.save();
}

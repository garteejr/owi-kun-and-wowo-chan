export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { generateReportFromPrompt } from "@/app/lib/gemini";
import { generateReportPDF } from "@/app/lib/pdf/generateReport";

function safeParseJSON(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  }
}

export async function POST(req: Request) {
  try {
    const { prompt, history = [] } = await req.json();

    const aiResult = await generateReportFromPrompt(prompt, history);

    let parsed;
    try {
      parsed = safeParseJSON(aiResult);
    } catch (e) {
      console.error("Invalid AI JSON:", aiResult);
      return NextResponse.json(
        { error: "AI menghasilkan JSON tidak valid" },
        { status: 500 },
      );
    }

    const pdfBytes = await generateReportPDF(parsed);
    const buffer = Buffer.from(pdfBytes);

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="laporan-pengaduan.pdf"',
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Gagal generate laporan PDF" },
      { status: 500 },
    );
  }
}

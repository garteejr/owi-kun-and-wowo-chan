// app/api/legal/route.ts
import { analyzeLegal, reasonLegal, planLegal } from "@/app/lib/gemini";
import { getLastMessages } from "@/app/lib/memory";
import { Message } from "@/app/lib/types";

let conversationStore: Message[] = [];

// ✅ Ganti ensureObject dengan extractJSON
function extractJSON(raw: any): object {
  // Sudah object, langsung return
  if (typeof raw === "object" && raw !== null) return raw;

  // Bukan string, return empty
  if (typeof raw !== "string") return {};

  try {
    // Coba parse langsung
    return JSON.parse(raw);
  } catch {
    // Strip markdown fence: ```json ... ``` atau ``` ... ```
    const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) {
      try {
        return JSON.parse(match[1].trim());
      } catch {
        return {};
      }
    }
    return {};
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const inputText = `
Konteks: ${body.konteks}
Kronologi: ${body.kronologi}
`;

    conversationStore.push({ role: "user", content: inputText });
    const history = getLastMessages(conversationStore);

    // STEP 1: ANALYZER
    const analyzerRaw = await analyzeLegal(inputText, history);
    const analyzer = extractJSON(analyzerRaw); // ✅
    console.log("[ANALYZER PARSED]", analyzer);

    // STEP 2: REASONER
    const reasonerRaw = await reasonLegal(JSON.stringify(analyzer), history);
    const reasoner = extractJSON(reasonerRaw); // ✅
    console.log("[REASONER PARSED]", reasoner);

    // STEP 3: PLANNER
    const plannerRaw = await planLegal(
      JSON.stringify({ ...analyzer, ...reasoner }),
      history,
    );
    const planner = extractJSON(plannerRaw); // ✅
    console.log("[PLANNER PARSED]", planner);

    const finalResult = { ...analyzer, ...reasoner, ...planner };
    console.log("[FINAL RESULT]", finalResult);

    if (Object.keys(finalResult).length === 0) {
      return Response.json(
        { error: "AI mengembalikan hasil kosong" },
        { status: 500 },
      );
    }

    conversationStore.push({
      role: "assistant",
      content: JSON.stringify(finalResult),
    });

    return Response.json({ result: finalResult });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Terjadi kesalahan pada AI" },
      { status: 500 },
    );
  }
}

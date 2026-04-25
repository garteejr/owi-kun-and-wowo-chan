// app/api/legal/route.ts
import { analyzeLegal, reasonLegal, planLegal } from "@/app/lib/gemini";
import { getLastMessages } from "@/app/lib/memory";
import { Message } from "@/app/lib/types";

let conversationStore: Message[] = [];

function safeJSONParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return {
      error: "INVALID_JSON",
      raw: text,
    };
  }
}

function cleanJSON(text: string) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const inputText = `
Konteks: ${body.konteks}
Kronologi: ${body.kronologi}
`;

    // simpan user dulu
    conversationStore.push({
      role: "user",
      content: inputText,
    });

    // baru ambil history
    const history = getLastMessages(conversationStore);

    // ======================
    // STEP 1: ANALYZER
    // ======================
    const analyzerRaw = await analyzeLegal(inputText, history);
    const analyzer = safeJSONParse(cleanJSON(analyzerRaw));

    // ======================
    // STEP 2: REASONER
    // ======================
    const reasonerRaw = await reasonLegal(JSON.stringify(analyzer), history);
    const reasoner = safeJSONParse(cleanJSON(reasonerRaw));

    // ======================
    // STEP 3: PLANNER
    // ======================
    const plannerRaw = await planLegal(
      JSON.stringify({
        ...analyzer,
        ...reasoner,
      }),
      history,
    );
    const planner = safeJSONParse(cleanJSON(plannerRaw));

    // ======================
    // FINAL MERGE
    // ======================
    const finalResult = {
      ...analyzer,
      ...reasoner,
      ...planner,
    };

    // simpan AI response
    conversationStore.push({
      role: "assistant",
      content: JSON.stringify(finalResult),
    });

    return Response.json({
      result: finalResult,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      { error: "Terjadi kesalahan pada AI" },
      { status: 500 },
    );
  }
}

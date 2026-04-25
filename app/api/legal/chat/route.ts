// app/api/legal/chat/route.ts
import { runChatPlain } from "@/app/lib/gemini"; // ✅ ganti import
import { getLastMessages } from "@/app/lib/memory";
import { Message } from "@/app/lib/types";

let conversationStore: Message[] = [];

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question?.trim()) {
      return Response.json({ error: "Pertanyaan kosong" }, { status: 400 });
    }

    conversationStore.push({ role: "user", content: question });
    const history = getLastMessages(conversationStore);

    const answer = await runChatPlain(
      // ✅ ganti dari runChat
      `Kamu adalah asisten hukum Indonesia. Jawab pertanyaan berikut secara jelas dan ringkas berdasarkan konteks percakapan sebelumnya.

Pertanyaan: ${question}`,
      history,
    );

    conversationStore.push({ role: "assistant", content: answer });

    return Response.json({ answer });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Terjadi kesalahan" }, { status: 500 });
  }
}

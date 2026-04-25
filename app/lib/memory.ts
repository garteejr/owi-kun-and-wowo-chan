// memory.ts
import { Message } from "./types";

export function getLastMessages(messages: Message[], limit = 10): Message[] {
  return messages.slice(-limit);
}

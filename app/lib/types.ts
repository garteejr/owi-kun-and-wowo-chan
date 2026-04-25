// types.ts
export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type LegalInput = {
  konteks: string;
  kronologi: string;
};

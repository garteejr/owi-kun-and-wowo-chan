"use client";

export default function ChatBox({ messages }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4 max-h-96 overflow-y-auto">
      {messages.map((msg: any, i: number) => (
        <div
          key={i}
          className={`mb-2 ${
            msg.role === "user" ? "text-right" : "text-left"
          }`}
        >
          <div
            className={`inline-block p-2 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {msg.role === "user"
              ? `${msg.content.konteks} - ${msg.content.kronologi}`
              : "AI telah memberikan analisis"}
          </div>
        </div>
      ))}
    </div>
  );
}
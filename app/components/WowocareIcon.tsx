// app/components/WowocareIcon.tsx

export default function WowocareIcon({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="36" height="36" rx="10" fill="#2e7d32" />

      {/* Daun kiri */}
      <path
        d="M10 22 C10 22 10 14 16 12 C16 12 14 18 18 20"
        stroke="#a5d6a7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Daun kanan */}
      <path
        d="M26 22 C26 22 26 14 20 12 C20 12 22 18 18 20"
        stroke="#a5d6a7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Batang */}
      <line
        x1="18"
        y1="20"
        x2="18"
        y2="26"
        stroke="#a5d6a7"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Bumi / akar */}
      <path
        d="M13 26 Q18 24 23 26"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Titik centang kecil di atas */}
      <circle cx="25" cy="11" r="4" fill="#81c784" />
      <path
        d="M23 11 L24.5 12.5 L27.5 9.5"
        stroke="#1b5e20"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
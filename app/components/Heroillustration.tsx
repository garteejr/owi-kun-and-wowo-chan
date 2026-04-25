import { JSX } from "react";

export default function HeroIllustration() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes floatSmooth {
          0% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-18px) scale(1.02);
          }
          100% {
            transform: translateY(0px) scale(1);
          }
        }

        .owl-float {
          animation: floatSmooth 4s ease-in-out infinite;
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      `,
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "500px",
          height: "500px",
        }}
      >
        {/* Glow bawah biar realistis */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "40px",
            background: "rgba(0,0,0,0.15)",
            filter: "blur(25px)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        />

        <div className="owl-float" style={{ position: "relative", zIndex: 1 }}>
          <img
            src="/owl-lawyer.webp"
            alt="Owl Lawyer"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </>
  );
}
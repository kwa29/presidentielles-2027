import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#07111f",
          borderRadius: 36,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            height: 14,
            width: "100%",
            background:
              "linear-gradient(90deg, #002654 0 33.33%, #f6f1e6 33.33% 66.66%, #ce1126 66.66% 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 88,
              height: 88,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999,
              border: "2px solid rgba(201, 164, 92, 0.65)",
              background: "#002654",
              color: "#e8d5a3",
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: 3,
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            RF
          </div>
          <div
            style={{
              display: "flex",
              color: "#c9a45c",
              fontSize: 14,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            2027
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

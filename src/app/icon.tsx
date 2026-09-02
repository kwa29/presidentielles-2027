import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#07111f",
        }}
      >
        <div
          style={{
            display: "flex",
            height: 6,
            width: "100%",
            background:
              "linear-gradient(90deg, #002654 0 33.33%, #f6f1e6 33.33% 66.66%, #ce1126 66.66% 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            color: "#e8d5a3",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 2,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          RF
        </div>
      </div>
    ),
    { ...size },
  );
}

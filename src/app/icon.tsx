import { ImageResponse } from "next/og";

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
          alignItems: "center",
          justifyContent: "center",
          background: "#002654",
          color: "#c9a45c",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        RF
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07111f",
          color: "#f3ead6",
          padding: 64,
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            height: 16,
            width: "100%",
            background: "linear-gradient(90deg, #002654 0 33%, #f6f1e6 33% 66%, #ce1126 66% 100%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 28,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#c9a45c",
            }}
          >
            Jeu gratuit · Quinquennat 2027-2032
          </div>
          <div style={{ fontSize: 84, lineHeight: 0.95, marginTop: 18 }}>
            Président(e) 2027
          </div>
          <div style={{ fontSize: 36, color: "#e8d5a3", marginTop: 12 }}>
            {SITE_TAGLINE}
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#9fb0cc" }}>
          5 tours · 100 mesures · 5 courants · 8 indicateurs
        </div>
      </div>
    ),
    { ...size },
  );
}

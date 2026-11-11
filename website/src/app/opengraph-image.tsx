import { ImageResponse } from "next/og";
import { MarkSvg } from "@/lib/og-mark";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          background: "#0f1f3d",
          padding: 64,
        }}
      >
        <MarkSvg size={220} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#fff",
            fontFamily: "sans-serif",
            textAlign: "center",
          }}
        >
          <div style={{ display: "flex", fontSize: 58, fontWeight: 800, letterSpacing: -1 }}>LAKEBOUND TRANSPORTATION</div>
          <div style={{ display: "flex", marginTop: 14, fontSize: 30, color: "#b6c2d6" }}>{site.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}

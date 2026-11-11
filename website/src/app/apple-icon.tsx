import { ImageResponse } from "next/og";
import { MarkSvg } from "@/lib/og-mark";

// iOS applies its own corner rounding to home-screen icons, so this is a
// plain full-bleed square (no border-radius of our own) at Apple's
// conventional size.
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
          alignItems: "center",
          justifyContent: "center",
          background: "#0f1f3d",
        }}
      >
        <MarkSvg size={132} />
      </div>
    ),
    size,
  );
}

import { crossOverlap, logoParts } from "@/components/logo-paths";

/**
 * The shield mark alone, as plain SVG with explicit fill colors (no CSS
 * classes, no <picture>/media queries) — the subset `next/og`'s ImageResponse
 * (Satori) can render, for the generated apple-icon and social-share image.
 * Matches the dark/reversed colorway: white letters and shield, teal arrows,
 * on a navy background the caller supplies separately.
 */
export function MarkSvg({ size }: { size: number }) {
  // The mark's own bounding box within the 480-wide logo canvas (see
  // logo-paths.ts); used to crop to just the shield, no wordmark beneath it.
  const box = { x: 33.5, y: 0, width: 413, height: 453.5 };
  return (
    <svg width={size} height={size} viewBox={`${box.x} ${box.y} ${box.width} ${box.height}`}>
      <path fill="#3aa391" d={logoParts.arrow} />
      <path fill="#3aa391" d={logoParts.swoosh} />
      <path fill="#fff" d={logoParts.blade} />
      <path fill="#fff" d={logoParts.base} />
      <path fill="#fff" d={logoParts.letterL} />
      <path fill="#fff" d={logoParts.letterTStem} />
      <path fill="#fff" d={logoParts.letterTBar} />
      <path fill="#3aa391" d={logoParts.cross} />
      <rect x={crossOverlap.x} y={crossOverlap.y} width={crossOverlap.width} height={crossOverlap.height} fill="#fff" opacity={0.28} />
      <path fill="#fff" d={logoParts.crossLens} />
    </svg>
  );
}

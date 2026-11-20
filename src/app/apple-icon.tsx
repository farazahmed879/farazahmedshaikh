import { ImageResponse } from "next/og";

// Home-screen icon for iPhone/iPad: the same "</>" mark as icon.svg, rendered as a PNG.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#03140d" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6">
            <path d="M23 19 10 32l13 13" stroke="#ffb020" />
            <path d="M41 19l13 13-13 13" stroke="#ffb020" />
            <path d="M36 14 28 50" stroke="#f5efdc" />
          </g>
        </svg>
      </div>
    ),
    size
  );
}

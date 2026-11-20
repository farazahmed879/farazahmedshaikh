/** Night-match stadium backdrop: mowed outfield stripes, swaying floodlight beams and a vignette. */
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-pitch-900">
      {/* mowed outfield stripes */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(100deg,rgba(255,255,255,0.028)_0_160px,transparent_160px_320px)]" />
      {/* floodlight beams */}
      <div className="animate-sway absolute -top-[8%] -left-[6%] h-[130vh] w-[70vw] origin-top-left opacity-80 blur-2xl [clip-path:polygon(0_0,14%_0,100%_100%,38%_100%)] bg-[linear-gradient(to_bottom,rgba(255,246,214,0.22),rgba(255,246,214,0.04)_60%,transparent)]" />
      <div
        className="animate-sway absolute -top-[8%] -right-[6%] h-[130vh] w-[70vw] origin-top-right opacity-70 blur-2xl [clip-path:polygon(86%_0,100%_0,62%_100%,0_100%)] bg-[linear-gradient(to_bottom,rgba(214,240,255,0.2),rgba(214,240,255,0.04)_60%,transparent)]"
        style={{ animationDelay: "-4s", animationDirection: "alternate-reverse" }}
      />
      {/* floodlight lamp heads */}
      {[
        "left-6 top-4",
        "right-6 top-4",
      ].map((pos) => (
        <div key={pos} className={`absolute ${pos} grid grid-cols-4 gap-1 opacity-90`}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-white shadow-[0_0_14px_5px_rgba(255,250,225,0.7)]" />
          ))}
        </div>
      ))}
      {/* coloured stadium glow */}
      <div className="animate-aurora absolute -bottom-[30%] left-[10%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.10),transparent_60%)] blur-3xl" />
      <div className="animate-aurora absolute -bottom-[25%] -right-[10%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,rgba(255,95,162,0.08),transparent_60%)] blur-3xl" style={{ animationDelay: "-9s" }} />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,12,8,0.85))]" />
    </div>
  );
}

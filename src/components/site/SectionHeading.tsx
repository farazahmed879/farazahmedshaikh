import Reveal from "./Reveal";

/** Big stadium-signage heading with an LED "over" counter. Wrap words in <span className="hl"> to highlight. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  index,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  index?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`mb-14 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        {index && <span className="led rounded-md border border-amber/30 bg-black/40 px-2 py-0.5 text-sm">OVER {index}</span>}
        <span className="cond text-xs text-lime">{eyebrow}</span>
      </div>
      <h2 className="font-display mt-4 text-5xl leading-[0.92] font-black tracking-tight text-chalk uppercase sm:text-7xl">{title}</h2>
      {subtitle && <p className="mt-5 text-lg leading-relaxed text-chalk/70">{subtitle}</p>}
    </Reveal>
  );
}

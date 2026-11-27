"use client";

import { useRef, useState } from "react";
import { Button, Spinner, inputCls, useToast } from "./ui";
import { SOCIAL_PLATFORMS } from "@/components/site/SocialIcon";

export type Field =
  | {
      name: string;
      label: string;
      type: "text" | "url" | "email" | "textarea" | "number" | "boolean" | "image" | "file" | "tags" | "lines";
      placeholder?: string;
      help?: string;
      rows?: number;
      full?: boolean;
    }
  | { name: string; label: string; type: "skills" | "socials" | "stats"; help?: string; full?: boolean }
  | { name: string; label: string; type: "images"; max?: number; help?: string; full?: boolean }
  | { name: string; label: string; type: "toggles"; options: { key: string; label: string }[]; help?: string; full?: boolean }
  | {
      name: string;
      label: string;
      type: "list";
      itemLabel: string;
      itemFields: { name: string; label: string; type: "text" | "textarea" | "image" | "images"; placeholder?: string; narrow?: boolean; help?: string }[];
      help?: string;
      full?: boolean;
    };

/** Renders a grid of form fields bound to a plain object. */
export function FieldsForm({ fields, value, onChange }: { fields: Field[]; value: any; onChange: (v: any) => void }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {fields.map((f) => {
        const full = f.full ?? ["textarea", "image", "images", "file", "tags", "lines", "skills", "socials", "stats", "toggles", "list"].includes(f.type);
        return (
          <div key={f.name} className={full ? "sm:col-span-2" : ""}>
            {f.type !== "boolean" && <label className="mb-1.5 block text-sm font-medium text-white/70">{f.label}</label>}
            <FieldInput field={f} value={value?.[f.name]} onChange={(v) => onChange({ ...value, [f.name]: v })} />
            {f.help && <p className="mt-1.5 text-xs text-white/40">{f.help}</p>}
          </div>
        );
      })}
    </div>
  );
}

function FieldInput({ field, value, onChange }: { field: Field; value: any; onChange: (v: any) => void }) {
  switch (field.type) {
    case "text":
    case "url":
    case "email":
      return (
        <input
          type={field.type === "text" ? "text" : field.type}
          className={inputCls}
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "number":
      return (
        <input type="number" className={inputCls} value={value ?? 0} onChange={(e) => onChange(Number(e.target.value))} />
      );
    case "textarea":
      return (
        <textarea
          className={`${inputCls} resize-y`}
          rows={field.rows ?? 4}
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "boolean":
      return <Toggle label={field.label} checked={Boolean(value)} onChange={onChange} />;
    case "image":
    case "file":
      return <UploadInput value={value ?? ""} onChange={onChange} kind={field.type} />;
    case "tags":
      return <TagsInput value={value ?? []} onChange={onChange} placeholder={field.placeholder} />;
    case "lines":
      return (
        <textarea
          className={`${inputCls} resize-y`}
          rows={field.rows ?? 4}
          value={(value ?? []).join("\n")}
          placeholder={field.placeholder ?? "One item per line"}
          onChange={(e) => onChange(e.target.value.split("\n"))}
          onBlur={(e) => onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
        />
      );
    case "images":
      return <ImagesInput value={value ?? []} onChange={onChange} max={field.max} />;
    case "skills":
      return <SkillsInput value={value ?? []} onChange={onChange} />;
    case "socials":
      return <SocialsInput value={value ?? []} onChange={onChange} />;
    case "stats":
      return <StatsInput value={value ?? []} onChange={onChange} />;
    case "list":
      return <ListInput field={field} value={value ?? []} onChange={onChange} />;
    case "toggles":
      return (
        <div className="grid gap-2 sm:grid-cols-3">
          {field.options.map((o) => (
            <Toggle key={o.key} label={o.label} checked={Boolean(value?.[o.key])} onChange={(v) => onChange({ ...value, [o.key]: v })} />
          ))}
        </div>
      );
  }
}

/** Editable list of small objects, each shown as a card (e.g. life chapters, goals). */
function ListInput({
  field,
  value,
  onChange,
}: {
  field: Extract<Field, { type: "list" }>;
  value: Record<string, any>[];
  onChange: (v: Record<string, any>[]) => void;
}) {
  const update = (i: number, patch: Record<string, any>) => onChange(value.map((x, k) => (k === i ? { ...x, ...patch } : x)));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const empty = Object.fromEntries(field.itemFields.map((f) => [f.name, f.type === "images" ? [] : ""]));

  return (
    <div className="space-y-3">
      {value.map((item, i) => (
        <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-white/40 uppercase">
              {field.itemLabel} {i + 1}
            </span>
            <div className="flex gap-1">
              <IconBtn onClick={() => move(i, -1)} label="Move up">↑</IconBtn>
              <IconBtn onClick={() => move(i, 1)} label="Move down">↓</IconBtn>
              <IconBtn onClick={() => onChange(value.filter((_, k) => k !== i))} label="Remove" danger>
                ✕
              </IconBtn>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-[repeat(4,minmax(0,1fr))]">
            {field.itemFields.map((f) => (
              <label key={f.name} className={`block ${f.narrow ? "" : f.type === "text" ? "sm:col-span-3" : "sm:col-span-4"}`}>
                <span className="mb-1 block text-xs text-white/50">{f.label}</span>
                {f.type === "textarea" ? (
                  <textarea
                    rows={3}
                    className={`${inputCls} resize-y`}
                    value={item[f.name] ?? ""}
                    placeholder={f.placeholder}
                    onChange={(e) => update(i, { [f.name]: e.target.value })}
                  />
                ) : f.type === "image" ? (
                  <UploadInput value={item[f.name] ?? ""} onChange={(v) => update(i, { [f.name]: v })} kind="image" />
                ) : f.type === "images" ? (
                  <ImagesInput value={item[f.name] ?? []} onChange={(v) => update(i, { [f.name]: v })} />
                ) : (
                  <input
                    className={inputCls}
                    value={item[f.name] ?? ""}
                    placeholder={f.placeholder}
                    onChange={(e) => update(i, { [f.name]: e.target.value })}
                  />
                )}
                {f.help && <span className="mt-1 block text-xs text-white/35">{f.help}</span>}
              </label>
            ))}
          </div>
        </div>
      ))}
      <Button type="button" variant="ghost" onClick={() => onChange([...value, { ...empty }])}>
        + Add {field.itemLabel.toLowerCase()}
      </Button>
    </div>
  );
}

export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-left text-sm text-white/80 transition hover:bg-white/[0.06]"
    >
      {label}
      <span className={`relative h-5 w-9 shrink-0 rounded-full transition ${checked ? "bg-amber" : "bg-white/15"}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${checked ? "left-[18px]" : "left-0.5"}`} />
      </span>
    </button>
  );
}

function UploadInput({ value, onChange, kind }: { value: string; onChange: (v: string) => void; kind: "image" | "file" }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  async function upload(file: File) {
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url);
      toast("Uploaded");
    } catch (err) {
      toast((err as Error).message, "error");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-start gap-3">
      {kind === "image" && (
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-contain" />
          ) : (
            <span className="text-xs text-white/30">No image</span>
          )}
        </div>
      )}
      <div className="flex-1 space-y-2">
        <input className={inputCls} value={value} placeholder="Paste a URL or upload" onChange={(e) => onChange(e.target.value)} />
        <div className="flex gap-2">
          <Button type="button" variant="ghost" onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? <Spinner /> : "Upload"}
          </Button>
          {value && (
            <Button type="button" variant="ghost" onClick={() => onChange("")}>
              Remove
            </Button>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          hidden
          accept={kind === "image" ? "image/png,image/jpeg,image/webp,image/gif,image/avif" : "application/pdf,image/*"}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
            e.target.value = "";
          }}
        />
      </div>
    </div>
  );
}

/** Several images (e.g. a photo carousel): upload many at once, reorder and remove. */
function ImagesInput({ value, onChange, max }: { value: string[]; onChange: (v: string[]) => void; max?: number }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(0);
  const toast = useToast();

  const room = max ? Math.max(max - value.length, 0) : Infinity;

  async function uploadAll(picked: File[]) {
    const files = picked.slice(0, room);
    if (files.length < picked.length) toast(`Only ${max} photos allowed — extra ones were skipped`, "error");
    if (!files.length) return;
    setUploading(files.length);
    const urls: string[] = [];
    for (const file of files) {
      try {
        const body = new FormData();
        body.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        urls.push(data.url);
      } catch (err) {
        toast(`${file.name}: ${(err as Error).message}`, "error");
      }
      setUploading((n) => n - 1);
    }
    if (urls.length) {
      onChange([...value, ...urls]);
      toast(urls.length === 1 ? "Photo added" : `${urls.length} photos added`);
    }
  }

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {value.map((url, i) => (
            <div key={url + i} className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-x-1 bottom-1 flex justify-between gap-1 rounded-lg bg-black/70 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
                <IconBtn onClick={() => move(i, -1)} label="Move left">←</IconBtn>
                <IconBtn onClick={() => onChange(value.filter((_, k) => k !== i))} label="Remove photo" danger>
                  ✕
                </IconBtn>
                <IconBtn onClick={() => move(i, 1)} label="Move right">→</IconBtn>
              </div>
            </div>
          ))}
        </div>
      )}
      <Button type="button" variant="ghost" onClick={() => fileRef.current?.click()} disabled={uploading > 0 || room === 0}>
        {uploading > 0 ? (
          <>
            <Spinner /> Uploading {uploading}…
          </>
        ) : (
          room === 0 ? `Maximum ${max} photos` : max ? `+ Add photos (${value.length}/${max})` : "+ Add photos"
        )}
      </Button>
      <input
        ref={fileRef}
        type="file"
        hidden
        multiple
        accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length) uploadAll(files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

function TagsInput({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const parts = draft.split(",").map((s) => s.trim()).filter(Boolean).filter((s) => !value.includes(s));
    if (parts.length) onChange([...value, ...parts]);
    setDraft("");
  };
  return (
    <div className={`${inputCls} flex flex-wrap items-center gap-1.5 py-2`}>
      {value.map((t) => (
        <span key={t} className="inline-flex items-center gap-1 rounded-lg bg-amber/15 px-2 py-1 text-xs text-amber">
          {t}
          <button type="button" onClick={() => onChange(value.filter((x) => x !== t))} className="text-amber/60 hover:text-white" aria-label={`Remove ${t}`}>
            ✕
          </button>
        </span>
      ))}
      <input
        className="min-w-[120px] flex-1 bg-transparent outline-none placeholder:text-white/25"
        value={draft}
        placeholder={placeholder ?? "Type and press Enter"}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
          } else if (e.key === "Backspace" && !draft && value.length) onChange(value.slice(0, -1));
        }}
        onBlur={add}
      />
    </div>
  );
}

function RowList<T>({
  items,
  onChange,
  render,
  empty,
  addLabel,
}: {
  items: T[];
  onChange: (v: T[]) => void;
  render: (item: T, update: (patch: Partial<T>) => void) => React.ReactNode;
  empty: T;
  addLabel: string;
}) {
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-2 rounded-xl border border-white/[0.05] p-2 sm:flex-row sm:items-center sm:border-0 sm:p-0">
          <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">{render(item, (patch) => onChange(items.map((x, k) => (k === i ? { ...x, ...patch } : x))))}</div>
          <div className="flex shrink-0 justify-end gap-1">
            <IconBtn onClick={() => move(i, -1)} label="Move up">↑</IconBtn>
            <IconBtn onClick={() => move(i, 1)} label="Move down">↓</IconBtn>
            <IconBtn onClick={() => onChange(items.filter((_, k) => k !== i))} label="Remove" danger>
              ✕
            </IconBtn>
          </div>
        </div>
      ))}
      <Button type="button" variant="ghost" onClick={() => onChange([...items, { ...empty }])}>
        + {addLabel}
      </Button>
    </div>
  );
}

export function IconBtn({ children, onClick, label, danger }: { children: React.ReactNode; onClick: () => void; label: string; danger?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-sm transition ${
        danger ? "text-rose-300/70 hover:bg-rose-500/15 hover:text-rose-200" : "text-white/50 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function SkillsInput({ value, onChange }: { value: { name: string; level: number }[]; onChange: (v: any[]) => void }) {
  return (
    <RowList
      items={value}
      onChange={onChange}
      empty={{ name: "", level: 70 }}
      addLabel="Add skill"
      render={(s, update) => (
        <>
          <input className={inputCls} value={s.name} placeholder="Skill" onChange={(e) => update({ name: e.target.value })} />
          <input
            type="range"
            min={0}
            max={100}
            value={s.level}
            onChange={(e) => update({ level: Number(e.target.value) })}
            className="w-full accent-[#ffb020] sm:w-32"
          />
          <span className="w-10 text-right text-xs text-white/50 tabular-nums">{s.level}%</span>
        </>
      )}
    />
  );
}

function SocialsInput({ value, onChange }: { value: { platform: string; url: string }[]; onChange: (v: any[]) => void }) {
  return (
    <RowList
      items={value}
      onChange={onChange}
      empty={{ platform: "github", url: "" }}
      addLabel="Add social link"
      render={(s, update) => (
        <>
          <select className={`${inputCls} sm:w-44 sm:shrink-0`} value={s.platform} onChange={(e) => update({ platform: e.target.value })}>
            {Object.entries(SOCIAL_PLATFORMS).map(([key, { label }]) => (
              <option key={key} value={key} className="bg-[#05170f]">
                {label}
              </option>
            ))}
          </select>
          <input className={inputCls} value={s.url} placeholder="https://…" onChange={(e) => update({ url: e.target.value })} />
        </>
      )}
    />
  );
}

function StatsInput({ value, onChange }: { value: { label: string; value: string }[]; onChange: (v: any[]) => void }) {
  return (
    <RowList
      items={value}
      onChange={onChange}
      empty={{ value: "", label: "" }}
      addLabel="Add stat"
      render={(s, update) => (
        <>
          <input className={`${inputCls} sm:w-28 sm:shrink-0`} value={s.value} placeholder="9+" onChange={(e) => update({ value: e.target.value })} />
          <input className={inputCls} value={s.label} placeholder="Years of experience" onChange={(e) => update({ label: e.target.value })} />
        </>
      )}
    />
  );
}

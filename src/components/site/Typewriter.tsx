"use client";

import { useEffect, useState } from "react";

/** Types and deletes each phrase in turn, with a blinking block caret. */
export default function Typewriter({ words, className }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const word = words[index % words.length];
    let delay = deleting ? 35 : 80;
    if (!deleting && text === word) delay = 1800;
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return (
    <span className={className}>
      {text}
      <span className="animate-blink ml-1 inline-block h-[0.9em] w-[0.5em] translate-y-[0.1em] bg-current" />
    </span>
  );
}

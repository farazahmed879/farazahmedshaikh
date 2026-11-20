"use client";

import { LazyMotion } from "framer-motion";

const loadFeatures = () => import("./motionFeatures").then((mod) => mod.default);

/**
 * Public pages use framer's lightweight `m` components; the animation features are fetched
 * after the page loads. `strict` makes any stray full `motion.*` component throw in development,
 * so the full library can't silently sneak back into the bundle.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}

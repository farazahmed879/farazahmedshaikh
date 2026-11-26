"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Public pages use framer's lightweight `m` components with only the `domAnimation` feature set
 * (no drag/layout). The features ship with the page rather than loading afterwards, so content that
 * starts hidden for its entrance animation can never get stuck waiting on an extra download.
 * `strict` makes any stray full `motion.*` component throw in development.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

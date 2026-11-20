// Loaded lazily by MotionProvider so the animation engine isn't part of the first JS download.
// domAnimation covers animate/exit/variants/whileInView/whileHover/whileTap — no drag or layout animations.
import { domAnimation } from "framer-motion";

export default domAnimation;

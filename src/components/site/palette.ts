/**
 * Team-kit colours that give cards their own identity (safe for server and client components).
 * Kept to three cricket tones — amber, turf cream and pitch green — so sections stay calm.
 */
export const KIT = ["#ffb020", "#d9c49a", "#5cc98a"];
export const kit = (i: number) => KIT[((i % KIT.length) + KIT.length) % KIT.length];

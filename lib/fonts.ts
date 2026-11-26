import { IBM_Plex_Sans_Arabic, Markazi_Text, Readex_Pro } from "next/font/google";

/**
 * Type system
 * ──────────
 * body     IBM Plex Sans Arabic  — neutral, highly legible at 16–18px, good numerals.
 * serif    Markazi Text          — editorial Arabic display with a Naskh flavour (Hero A).
 * display  Readex Pro            — geometric Arabic sans, 160–700 variable (Hero B, Hero C).
 *
 * Each face exposes a CSS variable; `app/globals.css` maps the variables to
 * Tailwind font utilities (`font-sans`, `font-serif`, `font-display`) with
 * real system fallback stacks behind them.
 */

export const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-body",
  fallback: ["Noto Sans Arabic", "Segoe UI", "Tahoma", "Arial", "sans-serif"],
});

export const markazi = Markazi_Text({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-display-serif",
  fallback: ["Noto Naskh Arabic", "Amiri", "Times New Roman", "serif"],
});

export const readex = Readex_Pro({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-display-sans",
  fallback: ["Noto Kufi Arabic", "Segoe UI", "Tahoma", "Arial", "sans-serif"],
});

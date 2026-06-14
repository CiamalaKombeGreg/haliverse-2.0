import type { HeadingLevel, MarkdownColor } from "./types";

export const headingClasses: Record<HeadingLevel, string> = {
  1: "mb-6 mt-8 text-4xl font-bold tracking-wide text-white",
  2: "mb-5 mt-7 text-3xl font-semibold tracking-wide text-cyan-100",
  3: "mb-4 mt-6 text-2xl font-semibold text-cyan-200",
  4: "mb-3 mt-5 text-xl font-semibold text-cyan-300",
};

export const markdownClasses = {
  root: "space-y-5 leading-8 text-slate-200",
  paragraph: "text-base leading-8 text-slate-200",
  bold: "font-bold text-white",
  italic: "italic text-slate-100",
  boldItalic: "font-bold italic text-white",
  link: "text-cyan-300 underline decoration-cyan-300/40 underline-offset-4 transition hover:text-cyan-100",
  blockquote:
    "border-l-2 border-cyan-300/40 bg-cyan-300/5 px-5 py-3 text-slate-200",
  orderedList: "list-decimal space-y-2 pl-6",
  unorderedList: "list-disc space-y-2 pl-6",
  horizontalRule: "my-8 border-0 border-t border-cyan-300/20",
};

export const colorClasses: Record<MarkdownColor, string> = {
  red: "text-red-700",
  orange: "text-orange-700",
  amber: "text-amber-700",
  yellow: "text-yellow-700",
  lime: "text-lime-700",
  green: "text-green-700",
  emerald: "text-emerald-700",
  teal: "text-teal-700",
  cyan: "text-cyan-700",
  sky: "text-sky-700",
  blue: "text-blue-700",
  indigo: "text-indigo-700",
  violet: "text-violet-700",
  purple: "text-purple-700",
  fuchsia: "text-fuchsia-700",
  pink: "text-pink-700",
  rose: "text-rose-700",
  slate: "text-slate-700",
  gray: "text-gray-700",
  zinc: "text-zinc-700",

  /**
   * Custom colors.
   * Since Tailwind does not include these by default,
   * we use arbitrary values for now.
   */
  mauve: "text-[#8f6f8f]",
  taupe: "text-[#8b7d72]",
  mist: "text-[#9fb6c3]",
  olive: "text-[#708238]",
  stone: "text-stone-700",
};
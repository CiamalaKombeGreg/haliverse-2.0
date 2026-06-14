import { ModifiedMarkdown } from "@/lib/markdown/renderer";
import { parseModifiedMarkdown } from "@/lib/markdown/parser";

export default function HomePage() {
  return (
    <main
      className="
        relative min-h-screen overflow-hidden bg-black text-white
      "
    >
      <div
        className="
          absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60
        "
        style={{
          backgroundImage: "url('/background.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />

      <section
        className="
          relative z-10 flex min-h-screen flex-col items-center justify-start
          px-6 pt-28 text-center
        "
      >
        <div
          className="
            mb-10 rounded-full border border-cyan-300/20 bg-cyan-300/10
            px-5 py-2 text-sm uppercase tracking-[0.35em] text-cyan-100
            shadow-[0_0_25px_rgba(34,211,238,0.15)]
            backdrop-blur-md
          "
        >
          Universe Database
        </div>

        <h1
          className="
            text-5xl font-bold tracking-[0.12em] text-white
            drop-shadow-[0_0_20px_rgba(34,211,238,0.35)]
            md:text-7xl
          "
        >
          HALIVERSE
        </h1>

        <section
          className="
            mt-12 max-w-3xl rounded-3xl border border-cyan-300/20
            bg-black/50 p-8 text-left shadow-[0_0_40px_rgba(34,211,238,0.12)]
            backdrop-blur-xl
          "
        >
          <h2 className="mb-4 text-2xl font-semibold text-cyan-100">
            Welcome
          </h2>

          <p className="leading-8 text-slate-200">
            This space will become the central database for worlds, characters,
            universes, stories, abilities, and linked lore systems.
          </p>
        </section>
      </section>
    </main>
  );
}
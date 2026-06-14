import Link from "next/link";

const wikiBooks = [
  {
    title: "Cosmology",
    href: "/wiki/cosmology",
    image: "/wiki/cosmology.jpg",
    color: "blue",
    className: "rotate-[-10deg] translate-y-6 md:translate-x-8",
  },
  {
    title: "Power Systems",
    href: "/wiki/power-systems",
    image: "/wiki/power-systems.jpg",
    color: "red",
    className: "rotate-[7deg] -translate-y-2 md:-translate-x-2",
  },
  {
    title: "Lorebooks",
    href: "/wiki/lorebooks",
    image: "/wiki/lorebooks.jpg",
    color: "green",
    className: "rotate-[-5deg] translate-y-3 md:-translate-x-6",
  },
  {
    title: "Abilities",
    href: "/wiki/abilities",
    image: "/wiki/abilities.jpg",
    color: "purple",
    className: "rotate-[11deg] translate-y-8 md:-translate-x-10",
  },
] as const;

const bookColorClasses = {
  blue: {
    cover: "from-blue-950 via-blue-800 to-cyan-700",
    border: "border-blue-300/40",
    glow: "hover:shadow-[0_0_45px_rgba(59,130,246,0.45)]",
    label: "text-blue-100",
  },
  red: {
    cover: "from-red-950 via-red-800 to-orange-700",
    border: "border-red-300/40",
    glow: "hover:shadow-[0_0_45px_rgba(239,68,68,0.45)]",
    label: "text-red-100",
  },
  green: {
    cover: "from-emerald-950 via-green-800 to-lime-700",
    border: "border-green-300/40",
    glow: "hover:shadow-[0_0_45px_rgba(34,197,94,0.45)]",
    label: "text-green-100",
  },
  purple: {
    cover: "from-purple-950 via-violet-800 to-fuchsia-700",
    border: "border-purple-300/40",
    glow: "hover:shadow-[0_0_45px_rgba(168,85,247,0.45)]",
    label: "text-purple-100",
  },
};

export default function WikiPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-45"
        style={{
          backgroundImage: "url('/wiki/background.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_55%)]" />

      <section className="relative z-10 flex min-h-screen flex-col items-center px-6 py-24">
        <div className="mb-14 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.45em] text-cyan-200/80">
            Haliverse Archives
          </p>

          <h1 className="text-5xl font-bold tracking-[0.15em] text-white drop-shadow-[0_0_22px_rgba(34,211,238,0.35)] md:text-7xl">
            WIKI
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-slate-300">
            Choose a section of the archive. Each book opens a different branch
            of the Haliverse database.
          </p>
        </div>

        <div className="relative flex w-full max-w-6xl flex-col items-center justify-center gap-8 md:flex-row md:gap-0">
          {wikiBooks.map((book) => {
            const colors = bookColorClasses[book.color];

            return (
              <Link
                key={book.href}
                href={book.href}
                className={`
                  group relative h-[24rem] w-[16rem] rounded-r-3xl rounded-l-lg
                  border ${colors.border}
                  bg-gradient-to-br ${colors.cover}
                  p-4 shadow-2xl transition duration-300 ease-out
                  hover:z-20 hover:-translate-y-6 hover:scale-105
                  ${colors.glow}
                  ${book.className}
                `}
              >
                <div className="absolute inset-y-0 left-0 w-5 rounded-l-lg bg-black/35 shadow-[inset_-8px_0_12px_rgba(0,0,0,0.35)]" />

                <div className="absolute inset-0 rounded-r-3xl rounded-l-lg bg-[linear-gradient(110deg,rgba(255,255,255,0.16),transparent_35%,rgba(0,0,0,0.25))]" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="overflow-hidden rounded-2xl border border-white/20 bg-black/30 shadow-lg">
                    <img
                      src={book.image}
                      alt={`${book.title} book illustration`}
                      className="h-44 w-full object-cover transition duration-300 group-hover:scale-110"
                    />
                  </div>

                  <div className="mt-auto">
                    <div className="mb-4 h-px w-full bg-white/30" />

                    <h2
                      className={`
                        text-center text-2xl font-bold uppercase tracking-[0.18em]
                        ${colors.label}
                        drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]
                      `}
                    >
                      {book.title}
                    </h2>

                    <p className="mt-4 text-center text-sm text-white/70">
                      Open archive
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
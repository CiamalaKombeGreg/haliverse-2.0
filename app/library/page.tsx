import Link from "next/link";

const libraryDoors = [
  {
    title: "Gallery",
    href: "/library/gallery",
    status: "Available soon",
    accent: "cyan",
    description:
      "A visual archive for all externally added images. Gallery is organized around Photos and Portfolios.",
    details: [
      "Photos are individual image entries uploaded or added to the app.",
      "Portfolios are personalized groups made around a topic, character, ability, world, or lore concept.",
      "Images added from characters, abilities, wiki pages, or other sections can later be linked directly to an existing portfolio.",
    ],
  },
  {
    title: "Stories",
    href: "/library/stories",
    status: "WIP",
    accent: "violet",
    description:
      "A future archive for storylines, arcs, written continuities, timelines, and narrative documents.",
    details: [
      "This section depends on future story, universe, and character modules.",
      "For now, it remains empty until those foundations exist.",
      "It will later help connect lore, events, and narrative progression.",
    ],
  },
] as const;

export default function LibraryPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_35%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.12),transparent_42%)]" />
      <div className="fixed inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.78),rgba(0,0,0,0.96))]" />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-24">
        <header className="mb-14 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.45em] text-cyan-200/75">
            Haliverse Archive
          </p>

          <h1 className="text-5xl font-bold tracking-[0.14em] text-white drop-shadow-[0_0_24px_rgba(34,211,238,0.28)] md:text-7xl">
            LIBRARY
          </h1>

          <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            The Library gathers storylines and visual information linked to the
            Haliverse. It is designed as a calm archive: a place to browse,
            classify, and reconnect visual or narrative material across the app.
          </p>
        </header>

        <section className="mb-14 rounded-3xl border border-cyan-300/15 bg-black/40 p-7 shadow-[0_0_45px_rgba(34,211,238,0.08)] backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-cyan-100">
            How the Library is divided
          </h2>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5">
              <h3 className="text-xl font-semibold text-cyan-100">Gallery</h3>

              <p className="mt-3 leading-7 text-slate-300">
                Gallery regroups every external image added to the app. It has a
                simple structure: <strong className="text-white">Photos</strong>{" "}
                and <strong className="text-white">Portfolios</strong>.
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-black/35 p-4">
                  <p className="font-semibold text-white">Photos</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Individual image entries stored in the application.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/35 p-4">
                  <p className="font-semibold text-white">Portfolios</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Personalized groups of photos linked to a topic.
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-violet-300/15 bg-violet-300/[0.04] p-5">
              <h3 className="text-xl font-semibold text-violet-100">
                Portfolio logic
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                A portfolio can be created first, then filled with existing
                photos. Or photos can be added directly and linked to a
                portfolio during creation.
              </p>

              <p className="mt-4 leading-7 text-slate-400">
                Later, when creating characters, abilities, wiki entries, or
                other modules, uploaded photos can be grouped into an existing
                portfolio immediately.
              </p>
            </article>
          </div>
        </section>

        <section className="grid flex-1 items-stretch gap-8 lg:grid-cols-2">
          {libraryDoors.map((door) => (
            <LibraryDoor key={door.href} door={door} />
          ))}
        </section>
      </section>
    </main>
  );
}

function LibraryDoor({
  door,
}: {
  door: (typeof libraryDoors)[number];
}) {
  const isGallery = door.accent === "cyan";

  return (
    <Link
      href={door.href}
      className={`
        group relative min-h-[26rem] overflow-hidden rounded-[2rem] border
        bg-black/45 p-7 backdrop-blur-xl transition duration-300
        hover:-translate-y-2 hover:scale-[1.01]
        ${
          isGallery
            ? "border-cyan-300/20 shadow-[0_0_45px_rgba(34,211,238,0.08)] hover:border-cyan-300/50 hover:shadow-[0_0_55px_rgba(34,211,238,0.18)]"
            : "border-violet-300/20 shadow-[0_0_45px_rgba(168,85,247,0.08)] hover:border-violet-300/50 hover:shadow-[0_0_55px_rgba(168,85,247,0.18)]"
        }
      `}
    >
      <div
        className={`
          absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100
          ${
            isGallery
              ? "bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_55%)]"
              : "bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.14),transparent_55%)]"
          }
        `}
      />

      <div
        className={`
          absolute right-8 top-8 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.25em]
          ${
            isGallery
              ? "border-cyan-300/25 bg-cyan-300/10 text-cyan-100"
              : "border-violet-300/25 bg-violet-300/10 text-violet-100"
          }
        `}
      >
        {door.status}
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div
          className={`
            mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border text-4xl
            ${
              isGallery
                ? "border-cyan-300/25 bg-cyan-300/10 text-cyan-100"
                : "border-violet-300/25 bg-violet-300/10 text-violet-100"
            }
          `}
        >
          {isGallery ? "▧" : "✦"}
        </div>

        <h2
          className={`
            text-4xl font-bold tracking-[0.12em]
            ${isGallery ? "text-cyan-100" : "text-violet-100"}
          `}
        >
          {door.title}
        </h2>

        <p className="mt-5 max-w-xl leading-8 text-slate-300">
          {door.description}
        </p>

        <div className="mt-8 space-y-3">
          {door.details.map((detail) => (
            <div
              key={detail}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-slate-300"
            >
              {detail}
            </div>
          ))}
        </div>

        <div className="mt-auto pt-8">
          <span
            className={`
              inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em]
              ${isGallery ? "text-cyan-100" : "text-violet-100"}
            `}
          >
            Enter section
            <span className="transition group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
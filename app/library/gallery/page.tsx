import Link from "next/link";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <section className="mx-auto max-w-5xl">
        <Link
          href="/library"
          className="rounded-2xl border border-cyan-300/25 bg-black/60 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-300/10"
        >
          ← Back to Library
        </Link>

        <div className="mt-12 rounded-3xl border border-cyan-300/20 bg-black/50 p-8">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-200/70">
            Library
          </p>

          <h1 className="text-5xl font-bold tracking-[0.12em]">GALLERY</h1>

          <p className="mt-6 max-w-3xl leading-8 text-slate-300">
            This section will later contain Photos and Portfolios. For now, this
            page is only a placeholder before the gallery database and upload
            logic are implemented.
          </p>
        </div>
      </section>
    </main>
  );
}
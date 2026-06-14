import Link from "next/link";

const navItems = [
  {
    label: "Wiki",
    href: "/wiki",
    icon: "⌬",
  },
  {
    label: "Characters",
    href: "/characters",
    icon: "◇",
  },
  {
    label: "Universes",
    href: "/universes",
    icon: "◎",
  },
  {
    label: "Library",
    href: "/library",
    icon: "▣",
  },
];

export function SideNavbar() {
  return (
    <aside className="group fixed left-0 top-0 z-50 h-screen w-4">
      <nav
        className="
          absolute left-0 top-0 flex h-screen w-20 -translate-x-[4.25rem]
          flex-col items-center gap-6 border-r border-cyan-300/20
          bg-black/70 px-3 py-5 shadow-[0_0_30px_rgba(34,211,238,0.15)]
          backdrop-blur-xl transition-transform duration-300 ease-out
          group-hover:translate-x-0
        "
      >
        <Link
          href="/"
          className="
            mb-8 flex h-12 w-12 items-center justify-center overflow-hidden
            rounded-2xl border border-cyan-300/30 bg-cyan-300/10
            shadow-[0_0_18px_rgba(34,211,238,0.25)]
            transition hover:scale-105 hover:bg-cyan-300/20
          "
          aria-label="Go to welcome page"
        >
          <img
            src="/logo.png"
            alt="Haliverse logo"
            className="h-full w-full object-cover"
          />
        </Link>

        <div className="flex flex-col items-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                group/item relative flex h-12 w-12 items-center justify-center
                rounded-2xl border border-white/10 bg-white/5 text-xl text-cyan-100
                transition hover:border-cyan-300/50 hover:bg-cyan-300/15
                hover:text-white hover:shadow-[0_0_18px_rgba(34,211,238,0.25)]
              "
              aria-label={item.label}
            >
              <span>{item.icon}</span>

              <span
                className="
                  pointer-events-none absolute left-16 rounded-lg border
                  border-cyan-300/20 bg-black/80 px-3 py-1 text-sm
                  text-cyan-50 opacity-0 shadow-lg backdrop-blur-md
                  transition group-hover/item:opacity-100
                "
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  );
}
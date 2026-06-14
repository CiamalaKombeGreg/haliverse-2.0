"use client";

import Link from "next/link";
import { useState } from "react";

type PageTab = "cosmology" | "tiering";

type SubTier = {
  id: string;
  name: string;
  description: string;
  examples: string[];
};

type Tier = {
  code: string;
  title: string;
  shortName: string;
  description: string;
  examples: string[];
  color: string;
  subtiers: SubTier[];
};

const cosmologyTiers: Tier[] = [
  {
    code: "Ω",
    title: "Absolute Narrative Transcendent",
    shortName: "Absolute Ceiling",
    description:
      "The final boundary of the Haliverse framework. This is not a normal upgrade tier, but the absolute end of the system itself.",
    examples: [
      "Cannot be reached by progression",
      "Cannot be surpassed from inside the framework",
      "Usually reserved for one principle or supreme narrative constant",
    ],
    color: "from-white via-cyan-200 to-purple-300",
    subtiers: [
      {
        id: "absolute-narrative-transcendent",
        name: "Absolute Narrative Transcendent",
        description:
          "The absolute ceiling of the system. This is not merely a stronger narrative entity, but the final boundary of the framework.",
        examples: [
          "A supreme principle that cannot be entered, surpassed, or exited",
          "The end-point of all Haliverse scaling logic",
          "A level almost never used for normal characters",
        ],
      },
    ],
  },
  {
    code: "0",
    title: "Narrative Transcendent",
    shortName: "Narrative Layer",
    description:
      "Entities, structures, or principles beyond dimensional, mathematical, and cosmological scaling, but still possibly limited by a higher narrative frame.",
    examples: [
      "Views lower cosmologies as fiction or symbolic layers",
      "Can affect stories, roles, scripts, or narrative outcomes",
      "May still have a superior narrative layer above them",
    ],
    color: "from-purple-300 via-fuchsia-500 to-violet-700",
    subtiers: [
      {
        id: "narrative-transcendental",
        name: "Narrative Transcendental",
        description:
          "Beyond dimensional and cosmological scaling. This level interacts with narratives, scripts, symbolic layers, roles, or fictionalized lower realities.",
        examples: [
          "Viewing a multiverse as a contained story",
          "Rewriting someone’s destined role",
          "Standing outside the normal logic of a cosmology",
        ],
      },
    ],
  },
  {
    code: "1",
    title: "Extradimensional",
    shortName: "Conceptual / Omniversal",
    description:
      "The highest internal metaphysical bracket before true narrative transcendence. It includes omniversal and conceptual structures still belonging to the setting.",
    examples: [
      "All dimensions inside a setting",
      "Conceptual beings and archetypal laws",
      "Fate, death, time, void, creation as metaphysical forces",
    ],
    color: "from-indigo-400 via-violet-700 to-purple-950",
    subtiers: [
      {
        id: "omniversal",
        name: "Omniversal",
        description:
          "Can affect all internal dimensional structures of a setting while still remaining inside that setting’s cosmological framework.",
        examples: [
          "All universes, timelines, and dimensions of one setting",
          "A total internal cosmology",
          "A structure that contains all lower realities but is not beyond narrative",
        ],
      },
      {
        id: "archetypal-conceptual",
        name: "Archetypal / Conceptual",
        description:
          "Can affect structures above ordinary dimensionality, but still through concepts, archetypes, metaphysical laws, or symbolic existence.",
        examples: [
          "Embodiments of death, fate, time, creation, void, or law",
          "Archetypal gods",
          "Conceptual entities above dimensional space but still inside metaphysics",
        ],
      },
    ],
  },
  {
    code: "2",
    title: "Dimensional",
    shortName: "Multiversal / Hyperversal",
    description:
      "Higher-dimensional and multiversal structures, including stacked realities, layered dimensions, and higher-order multiversal systems.",
    examples: [
      "Finite or infinite multiverses",
      "5D, 6D, 7D+ structures",
      "Layered higher realities",
    ],
    color: "from-blue-400 via-indigo-700 to-blue-950",
    subtiers: [
      {
        id: "multiversal",
        name: "Multiversal",
        description:
          "Can affect multiple universes, timelines, or complete space-time continuums.",
        examples: [
          "Several complete universes",
          "Many timelines",
          "Finite or infinite multiversal structures",
        ],
      },
      {
        id: "complex-multiversal",
        name: "Complex Multiversal",
        description:
          "Can affect higher-order multiversal structures, such as multiverses containing multiverses or 5D/6D frameworks.",
        examples: [
          "Multiverses layered inside larger multiverses",
          "5D or 6D cosmological frameworks",
          "Realms treating universes as lower-dimensional objects",
        ],
      },
      {
        id: "hyperversal",
        name: "Hyperversal",
        description:
          "Can affect finite higher-dimensional structures beyond ordinary multiversal logic.",
        examples: [
          "7D+ systems",
          "Stacked higher realities",
          "Finite dimensional ladders beyond complex multiversal structures",
        ],
      },
      {
        id: "great-order-hyperversal",
        name: "Great Order Hyperversal",
        description:
          "Can affect extremely high but still mathematically structured dimensional hierarchies. It remains ordered and describable, not truly narrative.",
        examples: [
          "Very high finite dimensional systems",
          "Countably infinite dimensional ladders",
          "Endless but structured higher-dimensional layers",
        ],
      },
    ],
  },
  {
    code: "3",
    title: "Universal",
    shortName: "Universe / Space-Time",
    description:
      "Universe-scale interaction, including complete universal structures and full space-time continuums.",
    examples: [
      "Observable universe",
      "Complete universe",
      "Full timeline or 4D universal structure",
    ],
    color: "from-cyan-300 via-blue-600 to-sky-950",
    subtiers: [
      {
        id: "observable-universal",
        name: "Observable Universal",
        description:
          "Can affect the observable universe or a structure comparable to it, especially when the full universe size is unknown.",
        examples: [
          "All observable galaxies",
          "The measurable cosmic horizon",
          "A visible universe-sized realm",
        ],
      },
      {
        id: "universal",
        name: "Universal",
        description:
          "Can affect a complete universe as a full 3D cosmological structure.",
        examples: [
          "All space inside one universe",
          "All matter and cosmic systems",
          "The physical laws of one universe",
        ],
      },
      {
        id: "complex-universal",
        name: "Complex Universal / 4D Universal",
        description:
          "Can affect a full space-time continuum, including past, present, future, causality, and alternate outcomes inside one universe.",
        examples: [
          "A full timeline",
          "Universal causality",
          "A complete 4D universal structure",
        ],
      },
    ],
  },
  {
    code: "4",
    title: "Galactic",
    shortName: "Galaxies",
    description:
      "Structures ranging from single galaxies to galaxy clusters, superclusters, and massive observable-universe-scale formations below true universal scaling.",
    examples: ["Galaxy", "Galaxy cluster", "Supercluster complex"],
    color: "from-sky-300 via-cyan-700 to-slate-950",
    subtiers: [
      {
        id: "galaxy",
        name: "Galaxy",
        description:
          "Can affect a galaxy or galaxy-sized structure.",
        examples: [
          "A Milky Way-sized structure",
          "A galaxy-scale realm",
          "A system containing billions of stars",
        ],
      },
      {
        id: "galaxy-cluster",
        name: "Galaxy Cluster",
        description:
          "Can affect groups or clusters of galaxies.",
        examples: [
          "Several galaxies bound together",
          "A galaxy cluster-scale warping field",
          "A force spanning multiple galaxies",
        ],
      },
      {
        id: "supercluster",
        name: "Supercluster",
        description:
          "Can affect massive connected structures made of many galaxy clusters.",
        examples: [
          "A supercluster-scale cosmic web region",
          "Massive collections of galaxy clusters",
          "Very large cosmic formations below universal scale",
        ],
      },
      {
        id: "supercluster-complex",
        name: "Supercluster Complex",
        description:
          "Can affect the largest observable-universe-scale structures below full universal scaling.",
        examples: [
          "Huge cosmic web complexes",
          "Massive structures approaching observable-universe comparison",
          "The largest galaxy formations short of universal scale",
        ],
      },
    ],
  },
  {
    code: "5",
    title: "Stellar",
    shortName: "Stars",
    description:
      "Stars, solar systems, and interstellar structures. This includes isolated stellar bodies and groups of star systems.",
    examples: ["Star", "Star system", "Star cluster"],
    color: "from-yellow-200 via-orange-500 to-red-900",
    subtiers: [
      {
        id: "star",
        name: "Star",
        description:
          "Can affect stars or stellar bodies.",
        examples: [
          "Destroying or creating a star",
          "Destabilizing stellar fusion",
          "Surviving star-level forces",
        ],
      },
      {
        id: "star-system",
        name: "Star System",
        description:
          "Can affect a complete solar system, including its star, planets, satellites, belts, and gravitational dynamics.",
        examples: [
          "A full solar system",
          "Planetary orbits around a star",
          "Asteroid belts and satellites in one stellar system",
        ],
      },
      {
        id: "star-cluster",
        name: "Star Cluster",
        description:
          "Can affect groups of star systems or major interstellar clusters.",
        examples: [
          "Several star systems",
          "A dense stellar cluster",
          "Large interstellar structures",
        ],
      },
    ],
  },
  {
    code: "6",
    title: "Planetary",
    shortName: "Planets",
    description:
      "Complete planetary-scale interaction, from moon-sized bodies to full planetary systems and giant planetary structures.",
    examples: ["Lunar", "Planetary", "Giant planetary"],
    color: "from-green-300 via-emerald-700 to-teal-950",
    subtiers: [
      {
        id: "lunar",
        name: "Lunar",
        description:
          "Can affect moon-sized bodies, major satellites, or small planetary bodies.",
        examples: [
          "A moon",
          "A large satellite",
          "A small planet-like body",
        ],
      },
      {
        id: "planetary",
        name: "Planetary",
        description:
          "Can affect a full planet as a complete system, including crust, oceans, atmosphere, core, gravity, biosphere, and orbit.",
        examples: [
          "A full Earth-like planet",
          "Planetary atmosphere and oceans",
          "Planet-wide gravity or biosphere systems",
        ],
      },
      {
        id: "giant-planetary",
        name: "Giant Planetary",
        description:
          "Can affect gas giants, super-Earths, brown dwarfs, or planet-star transitional bodies.",
        examples: [
          "Gas giants",
          "Super-Earths",
          "Brown dwarf-like planetary bodies",
        ],
      },
    ],
  },
  {
    code: "7",
    title: "Tectonic",
    shortName: "Continents / Nations",
    description:
      "Large natural and geopolitical scales, including islands, regions, countries, and continents.",
    examples: ["Island", "Regional", "National", "Continental"],
    color: "from-lime-300 via-green-700 to-stone-950",
    subtiers: [
      {
        id: "metropole",
        name: "Metropole",
        description:
          "Can affect mega-cities, large mountains, small islands, or microstates.",
        examples: [
          "Tokyo-sized zones",
          "Paris-sized zones",
          "Large mountain systems",
        ],
      },
      {
        id: "island",
        name: "Island",
        description:
          "Can affect large islands, island chains, multiple mountains, or small countries.",
        examples: [
          "A large island",
          "An island chain",
          "A small country",
        ],
      },
      {
        id: "regional",
        name: "Regional",
        description:
          "Can affect large regions, archipelagos, provinces, or small nations.",
        examples: [
          "A province",
          "An archipelago",
          "A large region inside a country",
        ],
      },
      {
        id: "national",
        name: "National",
        description:
          "Can affect full countries.",
        examples: [
          "A complete nation",
          "A country-wide storm, barrier, curse, or destruction field",
          "National-scale influence or containment",
        ],
      },
      {
        id: "continental",
        name: "Continental",
        description:
          "Can affect continents or continent-sized landmasses.",
        examples: [
          "A full continent",
          "A continent-sized landmass",
          "Continental tectonic or energetic systems",
        ],
      },
    ],
  },
  {
    code: "8",
    title: "Urban",
    shortName: "Cities",
    description:
      "Macro-scale interaction across human settlements, from large buildings to city-wide structures.",
    examples: ["Structural", "Town", "City"],
    color: "from-orange-300 via-amber-700 to-zinc-950",
    subtiers: [
      {
        id: "structural",
        name: "Structural",
        description:
          "Can affect large structures such as towers, stadiums, malls, city blocks, or large facilities.",
        examples: [
          "A stadium",
          "A skyscraper",
          "A large industrial facility",
        ],
      },
      {
        id: "town",
        name: "Town",
        description:
          "Can affect towns, villages, or local urban zones.",
        examples: [
          "A town",
          "A village",
          "Several neighborhoods",
        ],
      },
      {
        id: "city",
        name: "City",
        description:
          "Can affect most of a city’s physical structure, population zone, energetic system, or equivalent territory.",
        examples: [
          "A full city",
          "City-wide destruction",
          "City-wide barriers, perception, or influence",
        ],
      },
    ],
  },
  {
    code: "9",
    title: "Enhanced",
    shortName: "Superhuman",
    description:
      "The transition from natural limits into clear superhuman capability while still remaining localized.",
    examples: ["Superhuman", "Infrastructure", "Small settlements"],
    color: "from-red-300 via-red-700 to-neutral-950",
    subtiers: [
      {
        id: "superhuman",
        name: "Superhuman",
        description:
          "Clearly beyond human limits while remaining localized.",
        examples: [
          "Breaking walls",
          "Lifting vehicles",
          "Destroying rooms or small houses",
        ],
      },
      {
        id: "infrastructure",
        name: "Infrastructure",
        description:
          "Can affect buildings, streets, roads, bridges, small settlements, or human-made structures.",
        examples: [
          "Destroying bridges",
          "Damaging road networks",
          "Breaking through reinforced facilities",
        ],
      },
    ],
  },
  {
    code: "10",
    title: "Basic Life",
    shortName: "Biological Scale",
    description:
      "Natural biological and ordinary life-scale beings, from sub-human organisms to peak human capability.",
    examples: ["Sub-human", "Human", "Peak human"],
    color: "from-slate-300 via-slate-600 to-slate-950",
    subtiers: [
      {
        id: "sub-human",
        name: "Sub-Human",
        description:
          "Below average human force or capability.",
        examples: [
          "Small animals",
          "Children",
          "Weakened humans or fragile organisms",
        ],
      },
      {
        id: "human",
        name: "Human",
        description:
          "Normal human capability, including standard physical limits, intelligence, tool use, and ordinary biological constraints.",
        examples: [
          "Average adult humans",
          "Normal tools and weapons",
          "Ordinary biological limits",
        ],
      },
      {
        id: "peak-human",
        name: "Peak Human",
        description:
          "Maximum natural biological performance without truly superhuman scaling.",
        examples: [
          "Elite athletes",
          "Martial arts masters",
          "Highly trained soldiers or tactical geniuses",
        ],
      },
    ],
  },
  {
    code: "11",
    title: "Small Realm",
    shortName: "Microscopic",
    description:
      "Structures below normal visible scale, including quantum, atomic, molecular, and microscopic biological systems.",
    examples: ["Quantum", "Atomic", "Biological-microscopic"],
    color: "from-teal-200 via-cyan-700 to-black",
    subtiers: [
      {
        id: "quantum",
        name: "Quantum",
        description:
          "Subatomic, quantum, particle, wave-function, information-field, or quantum-realm interaction.",
        examples: [
          "Particles",
          "Wave-functions",
          "Quantum fields or quantum realms",
        ],
      },
      {
        id: "atomic",
        name: "Atomic",
        description:
          "Atomic and molecular interaction.",
        examples: [
          "Atoms",
          "Molecules",
          "Electrons, protons, and neutrons",
        ],
      },
      {
        id: "biological-microscopic",
        name: "Biological-Microscopic",
        description:
          "Microscopic biological systems.",
        examples: [
          "Cells",
          "Viruses",
          "DNA, bacteria, and microscopic organisms",
        ],
      },
    ],
  },
  {
    code: "12",
    title: "Sub-Dimensional",
    shortName: "Infinitesimal",
    description:
      "Entities and structures below ordinary 3D existence, such as flat realities, projections, or lower-dimensional shadows.",
    examples: ["2D beings", "Flat realities", "Lower-dimensional projections"],
    color: "from-zinc-300 via-zinc-700 to-black",
    subtiers: [
      {
        id: "sub-dimensional",
        name: "Sub-Dimensional / Infinitesimal",
        description:
          "For entities below ordinary 3D existence. This tier usually does not need prefixes.",
        examples: [
          "2D beings",
          "Flat realities",
          "Digital worlds without full physical dimensionality",
        ],
      },
    ],
  },
];

const prefixes = [
  {
    name: "Low",
    description:
      "The entity can affect the tier only partially or with clear inferiority.",
    example:
      "Low Planetary: can disturb or threaten a planet, but not fully dominate it.",
  },
  {
    name: "Baseline",
    description:
      "The entity can properly interact with the tier in a comparable way.",
    example: "Planetary: can affect a full planet as a complete system.",
  },
  {
    name: "High",
    description:
      "The entity is superior to the normal version of the tier, but still belongs to that tier.",
    example: "High Planetary: above normal planetary, but not Star-level.",
  },
  {
    name: "Multi",
    description: "The entity can affect multiple instances of the same tier.",
    example:
      "Multi-Planetary: can affect several planets, but not necessarily a star.",
  },
  {
    name: "+",
    description:
      "The entity is noticeably above its current position, but not enough to reach the next tier.",
    example: "Low Planetary+: above Low Planetary, but not fully Planetary.",
  },
];

const attributes = [
  "Destruction",
  "Creation",
  "Durability",
  "Range",
  "Perception",
  "Authority",
  "Existence",
  "Resistance",
  "Speed",
  "Influence",
];

const authorityLayers = [
  {
    name: "Low Authority",
    text: "Affects matter, energy, biology, space, or physical systems.",
  },
  {
    name: "World Authority",
    text: "Affects the rules of a specific world, realm, plane, or local cosmology.",
  },
  {
    name: "Cosmic Authority",
    text: "Affects universal, multiversal, causal, temporal, or dimensional rules.",
  },
  {
    name: "Narrative Authority",
    text: "Affects story roles, fate, plot structures, archetypes, or narrative layers.",
  },
];

export default function CosmologyPage() {
  const [activeTab, setActiveTab] = useState<PageTab>("cosmology");
  const [selectedTier, setSelectedTier] = useState<Tier>(cosmologyTiers[0]);
  const [selectedSubTier, setSelectedSubTier] = useState<SubTier>(
    cosmologyTiers[0].subtiers[0],
  );

  function selectTier(tier: Tier) {
    setSelectedTier(tier);
    setSelectedSubTier(tier.subtiers[0]);
  }

  function selectSubTier(tier: Tier, subtier: SubTier) {
    setSelectedTier(tier);
    setSelectedSubTier(subtier);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-35"
        style={{
          backgroundImage: "url('/wiki/cosmology/background.jpg')",
        }}
      />

      <div className="fixed inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_45%)]" />

      <div className="relative z-10 px-6 py-8">
        <Link
          href="/wiki"
          className="fixed left-6 top-6 z-40 rounded-2xl border border-cyan-300/25 bg-black/60 px-4 py-2 text-sm text-cyan-100 shadow-[0_0_25px_rgba(34,211,238,0.15)] backdrop-blur-xl transition hover:border-cyan-300/60 hover:bg-cyan-300/10"
        >
          ← Back to Wiki
        </Link>

        <section className="mx-auto max-w-7xl pt-20">
          <header className="mb-10 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.45em] text-cyan-200/80">
              Haliverse Wiki
            </p>

            <h1 className="text-5xl font-bold tracking-[0.12em] text-white drop-shadow-[0_0_25px_rgba(34,211,238,0.35)] md:text-7xl">
              COSMOLOGY
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              This page defines the structure of the Haliverse cosmology and
              the scaling system used to describe realms, entities, forces,
              artifacts, abilities, and narrative layers.
            </p>
          </header>

          <div className="mx-auto mb-14 flex w-fit rounded-2xl border border-cyan-300/20 bg-black/50 p-1 shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur-xl">
            <button
              onClick={() => setActiveTab("cosmology")}
              className={`rounded-xl px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] transition ${
                activeTab === "cosmology"
                  ? "bg-cyan-300/20 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.18)]"
                  : "text-slate-400 hover:text-cyan-100"
              }`}
            >
              Cosmology
            </button>

            <button
              onClick={() => setActiveTab("tiering")}
              className={`rounded-xl px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] transition ${
                activeTab === "tiering"
                  ? "bg-purple-300/20 text-purple-100 shadow-[0_0_20px_rgba(168,85,247,0.18)]"
                  : "text-slate-400 hover:text-purple-100"
              }`}
            >
              Tiering System
            </button>
          </div>

          {activeTab === "cosmology" ? (
            <CosmologyTab
              selectedTier={selectedTier}
              selectedSubTier={selectedSubTier}
              selectTier={selectTier}
              selectSubTier={selectSubTier}
            />
          ) : (
            <TieringSystemTab />
          )}
        </section>
      </div>
    </main>
  );
}

function CosmologyTab({
  selectedTier,
  selectedSubTier,
  selectTier,
  selectSubTier,
}: {
  selectedTier: Tier;
  selectedSubTier: SubTier;
  selectTier: (tier: Tier) => void;
  selectSubTier: (tier: Tier, subtier: SubTier) => void;
}) {
  return (
    <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-3xl border border-cyan-300/20 bg-black/45 p-6 shadow-[0_0_45px_rgba(34,211,238,0.08)] backdrop-blur-xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-cyan-100">
            Cosmological Pyramid
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Click a main layer to inspect it, or click one of its subtiers to
            open a focused explanation. The pyramid is ordered from the absolute
            narrative ceiling down to sub-dimensional existence.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          {cosmologyTiers.map((tier, index) => {
            const width = 24 + index * 5.4;
            const isSelected = selectedTier.code === tier.code;

            return (
              <div
                key={tier.code}
                className="flex w-full flex-col items-center"
              >
                <button
                  onClick={() => selectTier(tier)}
                  className={`relative min-h-12 max-w-full overflow-hidden rounded-md border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition duration-300 hover:scale-[1.03] ${
                    isSelected
                      ? "border-white/80 shadow-[0_0_28px_rgba(255,255,255,0.25)]"
                      : "border-white/15 hover:border-cyan-200/70"
                  } bg-gradient-to-r ${tier.color}`}
                  style={{
                    width: `${width}%`,
                    clipPath:
                      index === 0
                        ? "polygon(50% 0%, 100% 100%, 0% 100%)"
                        : "polygon(7% 0%, 93% 0%, 100% 100%, 0% 100%)",
                  }}
                >
                  <span className="relative z-10 drop-shadow-[0_0_6px_rgba(0,0,0,0.85)]">
                    {tier.code} — {tier.shortName}
                  </span>
                  <span className="absolute inset-0 bg-black/20" />
                </button>

                <div
                  className="mt-1 flex flex-wrap justify-center gap-1"
                  style={{ width: `${Math.min(width + 8, 100)}%` }}
                >
                  {tier.subtiers.map((subtier) => {
                    const active = selectedSubTier.id === subtier.id;

                    return (
                      <button
                        key={subtier.id}
                        onClick={() => selectSubTier(tier, subtier)}
                        className={`rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] transition ${
                          active
                            ? "border-white/70 bg-white/15 text-white shadow-[0_0_18px_rgba(255,255,255,0.18)]"
                            : "border-white/10 bg-black/35 text-slate-300 hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-cyan-100"
                        }`}
                      >
                        {subtier.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-purple-300/20 bg-black/45 p-7 shadow-[0_0_45px_rgba(168,85,247,0.08)] backdrop-blur-xl">
          <div
            className={`mb-6 rounded-2xl bg-gradient-to-r ${selectedTier.color} p-[1px]`}
          >
            <div className="rounded-2xl bg-black/80 p-5">
              <p className="mb-2 text-sm uppercase tracking-[0.35em] text-slate-300">
                Tier {selectedTier.code}
              </p>
              <h2 className="text-3xl font-bold text-white">
                {selectedTier.title}
              </h2>
            </div>
          </div>

          <p className="text-lg leading-8 text-slate-200">
            {selectedTier.description}
          </p>

          <div className="mt-8">
            <h3 className="mb-4 text-xl font-semibold text-cyan-100">
              Includes / Examples
            </h3>

            <div className="grid gap-3">
              {selectedTier.examples.map((example) => (
                <div
                  key={example}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-300"
                >
                  {example}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-cyan-300/20 bg-black/55 p-6 shadow-[0_0_45px_rgba(34,211,238,0.1)] backdrop-blur-xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300/80">
            Selected Subtier
          </p>

          <h3 className="text-2xl font-bold text-cyan-100">
            {selectedSubTier.name}
          </h3>

          <p className="mt-4 leading-8 text-slate-300">
            {selectedSubTier.description}
          </p>

          <div className="mt-6 grid gap-3">
            {selectedSubTier.examples.map((example) => (
              <div
                key={example}
                className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] px-4 py-3 text-sm text-cyan-50/90"
              >
                {example}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5">
          <h3 className="mb-3 text-lg font-semibold text-cyan-100">
            Cosmology Notes
          </h3>

          <p className="leading-7 text-slate-300">
            This layer describes the scale of structures and interactions. It
            does not automatically scale a character simply because they exist
            inside that layer. Scaling requires meaningful interaction such as
            affecting, surviving, perceiving, governing, creating, destroying,
            resisting, or transcending the structure.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:col-span-2">
        <InfoCard
          title="Dimensions"
          text="Dimensional scale describes the structure or axis of existence a realm belongs to. Higher-dimensional existence must be proven by interaction, not by presence alone."
        />
        <InfoCard
          title="Universes & Multiverses"
          text="A universe can be a full cosmic structure or a complete space-time continuum. A multiverse contains multiple universes, timelines, or universal continuums."
        />
        <InfoCard
          title="Narrative Layers"
          text="Narrative layers sit above normal cosmological scaling and describe authority over stories, scripts, roles, fate, or lower realities treated as fiction."
        />
      </div>
    </section>
  );
}

function TieringSystemTab() {
  return (
    <section className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-cyan-300/20 bg-black/45 p-7 shadow-[0_0_45px_rgba(34,211,238,0.08)] backdrop-blur-xl">
          <h2 className="text-3xl font-bold text-cyan-100">
            How Tiering Works
          </h2>

          <p className="mt-5 leading-8 text-slate-300">
            A tier represents the highest scale something can meaningfully
            interact with. Interaction can mean destruction, creation, survival,
            perception, range, containment, authority, resistance, existence, or
            narrative influence.
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <RuleBox
              number="01"
              title="Do not auto-scale from location"
              text="Being inside a higher realm does not grant that realm’s tier."
            />
            <RuleBox
              number="02"
              title="Separate hax from raw power"
              text="A bypassing ability may work on a high-tier target without granting equal destructive force."
            />
            <RuleBox
              number="03"
              title="Split attributes when needed"
              text="A character can be Universal in range but only City-level in normal attacks."
            />
            <RuleBox
              number="04"
              title="Use uncertainty"
              text="If the evidence is unclear, mark the scaling as uncertain instead of forcing a tier."
            />
          </div>
        </div>

        <div className="rounded-3xl border border-purple-300/20 bg-black/45 p-7 shadow-[0_0_45px_rgba(168,85,247,0.08)] backdrop-blur-xl">
          <h2 className="text-3xl font-bold text-purple-100">
            Scaling Model
          </h2>

          <div className="mt-6 space-y-4">
            <ScaleStep label="Feat" text="What happened?" />
            <ScaleStep
              label="Context"
              text="What was affected and under which conditions?"
            />
            <ScaleStep
              label="Attribute"
              text="Which attribute does this feat actually support?"
            />
            <ScaleStep
              label="Tier"
              text="What is the highest meaningful scale proven?"
            />
            <ScaleStep label="Limits" text="What does the feat not prove?" />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-red-300/20 bg-black/45 p-7 shadow-[0_0_45px_rgba(239,68,68,0.08)] backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-red-100">Prefixes</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-5">
          {prefixes.map((prefix) => (
            <div
              key={prefix.name}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-red-300/40 hover:bg-red-300/[0.06]"
            >
              <h3 className="text-xl font-bold text-white">{prefix.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {prefix.description}
              </p>
              <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-6 text-red-100/80">
                {prefix.example}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-green-300/20 bg-black/45 p-7 shadow-[0_0_45px_rgba(34,197,94,0.08)] backdrop-blur-xl">
          <h2 className="text-3xl font-bold text-green-100">
            Attribute Grid
          </h2>

          <p className="mt-4 leading-8 text-slate-300">
            Important characters, realms, artifacts, and abilities should not be
            forced into one single number. Use attributes when the scaling is
            mixed.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            {attributes.map((attribute) => (
              <div
                key={attribute}
                className="rounded-2xl border border-green-300/15 bg-green-300/[0.04] px-4 py-3 text-center text-sm font-semibold text-green-100"
              >
                {attribute}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-yellow-300/20 bg-black/45 p-7 shadow-[0_0_45px_rgba(234,179,8,0.08)] backdrop-blur-xl">
          <h2 className="text-3xl font-bold text-yellow-100">
            Example Profile
          </h2>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            {[
              ["Destruction", "City"],
              ["Durability", "Continental"],
              ["Range", "Universal through portals"],
              ["Perception", "Multiversal"],
              ["Authority", "Cosmic"],
              ["Existence", "4D-linked but not fully 4D"],
            ].map(([key, value]) => (
              <div
                key={key}
                className="grid grid-cols-[0.8fr_1.2fr] border-b border-white/10 last:border-b-0"
              >
                <div className="bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200">
                  {key}
                </div>
                <div className="px-4 py-3 text-sm text-slate-300">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-400">
            This format prevents one feat from incorrectly upgrading every part
            of a character.
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-purple-300/20 bg-black/45 p-7 shadow-[0_0_45px_rgba(168,85,247,0.08)] backdrop-blur-xl">
        <h2 className="text-3xl font-bold text-purple-100">
          Authority Layers
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {authorityLayers.map((layer, index) => (
            <div
              key={layer.name}
              className="relative overflow-hidden rounded-2xl border border-purple-300/15 bg-purple-300/[0.04] p-5"
            >
              <div className="absolute right-4 top-4 text-5xl font-black text-white/[0.03]">
                {index + 1}
              </div>
              <h3 className="relative text-lg font-bold text-purple-100">
                {layer.name}
              </h3>
              <p className="relative mt-3 text-sm leading-6 text-slate-300">
                {layer.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-3xl border border-cyan-300/15 bg-black/45 p-6 shadow-[0_0_35px_rgba(34,211,238,0.06)] backdrop-blur-xl">
      <h3 className="text-xl font-bold text-cyan-100">{title}</h3>
      <p className="mt-4 leading-7 text-slate-300">{text}</p>
    </article>
  );
}

function RuleBox({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5">
      <p className="text-xs font-bold tracking-[0.35em] text-cyan-300/70">
        {number}
      </p>
      <h3 className="mt-3 text-lg font-semibold text-cyan-100">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}

function ScaleStep({ label, text }: { label: string; text: string }) {
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-purple-300/15 bg-purple-300/[0.04] p-4 transition hover:border-purple-300/40 hover:bg-purple-300/[0.08]">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-300/30 bg-purple-300/10 text-sm font-bold text-purple-100">
        {label.slice(0, 2).toUpperCase()}
      </div>

      <div>
        <h3 className="font-semibold text-purple-100">{label}</h3>
        <p className="text-sm text-slate-300">{text}</p>
      </div>
    </div>
  );
}
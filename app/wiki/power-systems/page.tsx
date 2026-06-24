"use client";

import Link from "next/link";
import { useState } from "react";

type CategoryId =
  | "physical"
  | "speed"
  | "sensory"
  | "intelligence"
  | "mental_social"
  | "combat"
  | "power_system"
  | "metaphysical"
  | "resistance";

type Stat = {
  name: string;
  description: string;
  type: string;
  valueMode: string;
  importance: string;
  dependency?: string;
};

type StatCategory = {
  id: CategoryId;
  label: string;
  description: string;
  color: string;
  stats: Stat[];
};

const referenceLinks = [
  ["Core Logic", "core-logic"],
  ["Stat Types", "stat-types"],
  ["Value Modes", "value-modes"],
  ["Importance", "importance"],
  ["Dependencies", "dependencies"],
  ["AP / DC / Hax / Authority", "separation"],
  ["Stat Categories", "stat-categories"],
  ["Authority Scale", "authority-scale"],
  ["Resistance Scale", "resistance-scale"],
  ["High-Level Values", "high-level-values"],
  ["Custom Stats", "custom-stats"],
  ["Example Profile", "example-profile"],
];

const statTypes = [
  {
    title: "Progressive",
    text: "A progressive stat follows a ladder and has one selected value at a time.",
    example: "Durability: Planetary",
  },
  {
    title: "Cumulative",
    text: "A cumulative stat contains several values. Each value can have its own tier, importance, and notes.",
    example: "Resistance: Time Stop — Complex Universal — Core",
  },
  {
    title: "Exclusive Cumulative",
    text: "A cumulative stat where some values cannot coexist unless a special exception explains it.",
    example: "Body Constitution: Organic / Inorganic / Virtual / Conceptual",
  },
  {
    title: "Variable Importance",
    text: "Some stats matter differently depending on the character, setting, role, or power system.",
    example: "Power Mastery, Leadership, Experience, Synergy",
  },
];

const valueModes = [
  {
    title: "Tiering System Values",
    text: "Values directly mapped to the Haliverse tiering system.",
    examples: ["Attack Potency: Low Universal", "Durability: Planetary"],
  },
  {
    title: "Unique Scale Values",
    text: "Values using their own scale while still allowing tier association when useful.",
    examples: ["Running Speed: FTL", "Authority: World Authority"],
  },
  {
    title: "Non-Tiered Values",
    text: "Values that should not be associated with a tier.",
    examples: ["NONE", "Immobile", "Mindless", "Insubstantial"],
  },
  {
    title: "Contextual / Unknown Values",
    text: "Values that exist, but cannot be automatically mapped to one stable tier.",
    examples: ["UNKNOWN", "Immeasurable Speed", "Dimensional Authority"],
  },
];

const importanceLevels = [
  ["Flavor", "Interesting, but not very important for scaling."],
  ["Minor", "Relevant in specific cases, but not a major power factor."],
  ["Secondary", "Useful and regularly relevant, but not the main advantage."],
  ["Major", "Strongly affects combat, scaling, or matchups."],
  ["Core", "One of the character’s main advantages."],
  ["Defining", "Defines the character’s existence, identity, role, or narrative function."],
];

const dependencies = [
  {
    title: "Striking Strength → Attack Potency",
    text: "Planetary Striking Strength usually implies at least Planetary Attack Potency. The opposite is not automatically true.",
  },
  {
    title: "Attack Potency ≠ Destructive Capabilities",
    text: "AP measures effective damage against a valid target. DC measures environmental spread.",
  },
  {
    title: "Destructive Capabilities ≠ Attack Potency",
    text: "A city-sized explosion can destroy a city but still fail against a higher-dimensional being.",
  },
  {
    title: "Sensory Range → Perception",
    text: "Range says how far something is detected. Perception says how well it is understood. Accuracy says how clear the information is.",
  },
  {
    title: "Hax may bypass Durability",
    text: "A weak character can affect a stronger target through soul, time, concept, or reality-based effects without having equal raw AP.",
  },
  {
    title: "Authority may override lower systems",
    text: "Authority measures rule control. It can override abilities, laws, or systems below its authority level.",
  },
];

const separationCards = [
  {
    title: "Attack Potency",
    short: "Effective damage",
    text: "How strong an attack is when it connects or applies against a valid target. It does not automatically describe area destroyed.",
  },
  {
    title: "Maximum Attack Potency",
    short: "Peak output",
    text: "The highest output under special conditions: transformation, charge time, sacrifice, artifact, or external energy.",
  },
  {
    title: "Destructive Capabilities",
    short: "Environmental spread",
    text: "How much area, structure, or environment can be destroyed.",
  },
  {
    title: "Striking Strength",
    short: "Physical force",
    text: "Raw body-based hit force. It should not include spells, weapons, energy blasts, hax, or conceptual attacks.",
  },
  {
    title: "Hax Potency",
    short: "Bypass effect strength",
    text: "Non-physical or rule-breaking effects like soul damage, time stop, sealing, fate manipulation, or existence erasure.",
  },
  {
    title: "Authority",
    short: "Rule supremacy",
    text: "How deeply an entity can impose, command, rewrite, or override a system, world, dimension, concept, cosmology, or narrative.",
  },
];

const categories: StatCategory[] = [
  {
    id: "physical",
    label: "Physical",
    color: "cyan",
    description: "Body-based performance, force, resilience, and physical limitations.",
    stats: [
      ["Striking Strength", "Raw physical hit force using the body alone.", "Progressive", "Tiering System", "Usually Major"],
      ["Lifting Strength", "How much force the body can lift, hold, push, or restrain.", "Progressive", "Tiering System", "Variable"],
      ["Durability", "How much damage the body or structure can withstand.", "Progressive", "Tiering System", "Usually Major/Core"],
      ["Endurance", "How much stress, damage, pain, or pressure can be endured.", "Progressive", "Unique Scale", "Variable"],
      ["Stamina", "How long the character can keep acting before exhaustion.", "Progressive", "Unique Scale", "Variable"],
      ["Body Constitution", "The nature of the body: organic, inorganic, virtual, energy-based, conceptual, etc.", "Exclusive Cumulative", "Custom", "Variable"],
      ["Body Control", "How precisely the entity can control its body, form, or functions.", "Progressive", "Unique Scale", "Variable"],
    ].map(toStat),
  },
  {
    id: "speed",
    label: "Speed",
    color: "blue",
    description: "Movement, reaction, acceleration, and activation timing separated into clear stats.",
    stats: [
      ["Running Speed", "How fast the character can move through physical locomotion.", "Progressive", "Unique Scale", "Secondary/Major"],
      ["Travel Speed", "How fast the character can cross large distances.", "Progressive", "Unique Scale", "Variable"],
      ["Agility", "How fast, fluidly, and efficiently the character moves in combat.", "Progressive", "Unique Scale", "Variable"],
      ["Reaction Speed", "How fast the character perceives, processes, and begins responding.", "Progressive", "Unique Scale", "Usually Major/Core"],
      ["Acceleration", "How quickly the character reaches maximum speed.", "Progressive", "Unique Scale", "Variable"],
      ["Activation Speed", "How quickly a power or effect triggers after the decision to use it.", "Progressive", "Unique Scale", "Usually Major"],
    ].map(toStat),
  },
  {
    id: "sensory",
    label: "Sensory",
    color: "sky",
    description: "Detection, understanding, and precision of sensory information.",
    stats: [
      ["Perception Awareness", "How well surroundings, threats, and changes are detected and understood.", "Progressive", "Unique Scale", "Major/Core"],
      ["Sensory Range", "The maximum distance or scale at which stimuli can be detected.", "Progressive", "Tiering System", "Variable"],
      ["Sensory Accuracy", "The clarity, precision, and correctness of sensory information.", "Progressive", "Unique Scale", "Variable"],
    ].map(toStat),
  },
  {
    id: "intelligence",
    label: "Intelligence",
    color: "yellow",
    description: "Knowledge, reasoning, creativity, learning, battle thinking, and experience.",
    stats: [
      ["Global Intelligence", "Broad knowledge, memory, learning capacity, and overall understanding.", "Progressive", "Unique Scale", "Variable"],
      ["Logical Intelligence", "Reasoning, deduction, problem-solving, and analytical depth.", "Progressive", "Unique Scale", "Variable"],
      ["Battle Intelligence", "Combat adaptation, opponent reading, tactics, and weakness exploitation.", "Progressive", "Unique Scale", "Major/Core"],
      ["Creative Intelligence", "Inventive thinking, design, science, art, engineering, and unconventional problem-solving.", "Progressive", "Unique Scale", "Variable"],
      ["Learning Speed", "How fast the character improves or learns.", "Progressive", "Unique Scale", "Variable"],
      ["Experience", "The quantity, diversity, and relevance of situations undergone.", "Cumulative", "Custom", "Variable"],
    ].map(toStat),
  },
  {
    id: "mental_social",
    label: "Mental / Social",
    color: "pink",
    description: "Will, emotional control, group influence, and personal presence.",
    stats: [
      ["Willpower", "Resistance to fear, despair, manipulation, illusions, domination, or conceptual pressure.", "Progressive", "Unique Scale", "Major/Core"],
      ["Emotional Control", "Ability to regulate fear, rage, panic, obsession, instability, and influence.", "Progressive", "Unique Scale", "Variable"],
      ["Leadership", "Ability to inspire, command, dominate, organize, or influence groups.", "Progressive", "Unique Scale", "Variable Importance"],
      ["Charm", "Personal appeal in direct interaction, persuasion, seduction, or disarming presence.", "Progressive", "Unique Scale", "Variable"],
    ].map(toStat),
  },
  {
    id: "combat",
    label: "Combat",
    color: "red",
    description: "Applied fighting ability, defense, precision, adaptation, and internal synergy.",
    stats: [
      ["Combat Skills", "Technique, martial arts, weapons, tactics, positioning, timing, and fight application.", "Progressive", "Unique Scale", "Core"],
      ["Defensive Capabilities", "Ability to avoid, block, redirect, counter, or nullify incoming attacks.", "Progressive", "Unique Scale", "Major"],
      ["Accuracy", "Correctness and precision of execution, aim, repeatability, and control.", "Progressive", "Unique Scale", "Variable"],
      ["Versatility", "Ability to adapt across situations using skills, powers, intellect, and resources.", "Progressive", "Unique Scale", "Major/Core"],
      ["Synergy", "How well stats, powers, skills, and systems work together.", "Progressive", "Unique Scale", "Variable Importance"],
    ].map(toStat),
  },
  {
    id: "power_system",
    label: "Power System",
    color: "purple",
    description: "Output, range, effects, reserves, growth, mastery, and special power behavior.",
    stats: [
      ["Attack Potency", "Consistent effective damage output against valid targets.", "Progressive", "Tiering System", "Major/Core"],
      ["Maximum Attack Potency", "Highest possible output under peak, special, or limited conditions.", "Progressive", "Tiering System", "Core/Defining"],
      ["Destructive Capabilities", "Environmental spread of destruction.", "Progressive", "Tiering System", "Variable"],
      ["Application Range", "Maximum distance at which a character or ability can affect a target.", "Progressive", "Tiering System", "Variable"],
      ["Area of Effect", "Size of the impact zone, radius, field, or spread.", "Progressive", "Tiering System", "Variable"],
      ["Global Potential", "Maximum level a character or system could plausibly reach under its own rules.", "Progressive", "Tiering System", "Variable"],
      ["Growth Speed", "How quickly a character evolves, adapts, or improves.", "Progressive", "Unique Scale", "Variable"],
      ["Power Mastery", "How well a user controls, understands, and applies their power system.", "Progressive", "Unique Scale", "Variable Importance"],
      ["Power Capabilities", "What the power can do and what categories of effects it can produce.", "Cumulative", "Tiered Stack", "Per Value"],
      ["Power Potential", "Maximum evolution or refinement a power system can theoretically reach.", "Progressive", "Tiering System", "Variable"],
      ["Power Reserves", "Amount of usable energy, mana, ki, chakra, chaos energy, or equivalent.", "Progressive", "Unique Scale", "Variable Importance"],
      ["Power Recovery", "How quickly reserves or system function recover after depletion.", "Progressive", "Unique Scale", "Variable"],
      ["Power Efficiency", "How well energy is converted into output with minimal waste.", "Progressive", "Unique Scale", "Variable Importance"],
      ["Hax Potency", "Strength of non-physical, rule-breaking, bypass, or metaphysical effects.", "Progressive", "Tiering System", "Major/Core"],
    ].map(toStat),
  },
  {
    id: "metaphysical",
    label: "Metaphysical",
    color: "violet",
    description: "Existence, authority, narrative position, and ontological structure.",
    stats: [
      ["Ontological Level", "The nature of existence and how fundamentally real, abstract, or transcendent it is.", "Progressive", "Unique Scale", "Major/Defining"],
      ["Authority", "How deeply an entity can command, rewrite, or override rules.", "Progressive", "Unique Scale", "Major/Core/Defining"],
      ["Narrative Position", "How the entity relates to narrative layers, story hierarchy, fictionality, and meta-structure.", "Progressive", "Unique Scale", "Defining"],
      ["Existence Type", "Physical, conceptual, abstract, virtual, dimensional, narrative, or other existence forms.", "Exclusive Cumulative", "Custom", "Variable"],
    ].map(toStat),
  },
  {
    id: "resistance",
    label: "Resistance",
    color: "emerald",
    description: "A cumulative group for effects the entity can withstand, ignore, reduce, counter, or remain unaffected by.",
    stats: [
      ["Resistance", "A stack of specific resistances, each with its own tier, importance, and notes.", "Cumulative", "Custom / Tiered Stack", "Per Value"],
    ].map(toStat),
  },
];

const authorityScale = [
  ["No Authority", "NONE"],
  ["Local Authority", "Human / Superhuman"],
  ["Environmental Authority", "Urban / Tectonic"],
  ["World Authority", "Planetary"],
  ["Cosmic Authority", "Galactic / Universal"],
  ["Spatiotemporal Authority", "Complex Universal"],
  ["Multiversal Authority", "Multiversal"],
  ["Dimensional Authority", "UNKNOWN"],
  ["Conceptual Authority", "UNKNOWN"],
  ["Archetypal Authority", "Archetypal"],
  ["Narrative Authority", "Narrative Transcendent"],
  ["Absolute Authority", "Absolute Narrative Transcendent"],
];

const resistanceExamples = [
  "Physical Resistance",
  "Energy Resistance",
  "Mental Resistance",
  "Illusion Resistance",
  "Soul Resistance",
  "Time Resistance",
  "Space Resistance",
  "Gravity Resistance",
  "Reality Warping Resistance",
  "Conceptual Resistance",
  "Causality Resistance",
  "Fate Resistance",
  "Existence Erasure Resistance",
  "Void Resistance",
  "Dimensional Resistance",
  "Narrative Resistance",
  "Authority Resistance",
];

function toStat([name, description, type, valueMode, importance]: string[]): Stat {
  return { name, description, type, valueMode, importance };
}

export default function PowerSystemsPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("physical");
  const [openStat, setOpenStat] = useState<string | null>("Striking Strength");

  const category = categories.find((item) => item.id === activeCategory)!;

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_40%)]" />
      <div className="fixed inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.82),rgba(0,0,0,0.96))]" />

      <div className="relative z-10 px-6 py-8">
        <Link
          href="/wiki"
          className="fixed left-6 top-6 z-40 rounded-2xl border border-red-300/25 bg-black/60 px-4 py-2 text-sm text-red-100 shadow-[0_0_25px_rgba(239,68,68,0.15)] backdrop-blur-xl transition hover:border-red-300/60 hover:bg-red-300/10"
        >
          ← Back to Wiki
        </Link>

        <section className="mx-auto max-w-7xl pt-20">
          <header className="mb-12 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.45em] text-red-200/80">
              Haliverse Wiki
            </p>

            <h1 className="text-5xl font-bold tracking-[0.12em] text-white drop-shadow-[0_0_25px_rgba(239,68,68,0.35)] md:text-7xl">
              POWER SYSTEMS
            </h1>

            <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-300">
              A readable framework for evaluating characters, abilities,
              artifacts, forces, and cosmological systems through separated
              stats instead of one forced universal scale.
            </p>
          </header>

          <section
            id="reference"
            className="mb-12 rounded-3xl border border-red-300/20 bg-black/45 p-6 shadow-[0_0_45px_rgba(239,68,68,0.08)] backdrop-blur-xl"
          >
            <h2 className="text-2xl font-bold text-red-100">
              Reference Table
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Jump directly to the section you need.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {referenceLinks.map(([label, href]) => (
                <a
                  key={href}
                  href={`#${href}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:-translate-y-1 hover:border-red-300/40 hover:bg-red-300/[0.08] hover:text-red-100"
                >
                  {label}
                </a>
              ))}
            </div>
          </section>

          <section
            id="core-logic"
            className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="rounded-3xl border border-cyan-300/20 bg-black/45 p-7 shadow-[0_0_45px_rgba(34,211,238,0.08)] backdrop-blur-xl">
              <h2 className="text-3xl font-bold text-cyan-100">
                Core Logic
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                A stat is a structured measurement of one aspect of an entity,
                character, ability, artifact, force, or cosmological system.
              </p>

              <div className="mt-6 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">
                  Main Rule
                </p>
                <p className="mt-3 text-xl font-semibold leading-8 text-white">
                  A character does not have one universal scale. A character has
                  different stats that may scale differently.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-purple-300/20 bg-black/45 p-7 shadow-[0_0_45px_rgba(168,85,247,0.08)] backdrop-blur-xl">
              <h2 className="text-3xl font-bold text-purple-100">
                Stat Anatomy
              </h2>

              <div className="mt-6 grid gap-3">
                {[
                  "Name",
                  "Category",
                  "Type",
                  "Value",
                  "Tier Association",
                  "Importance",
                  "Notes / Context",
                  "Optional Dependencies",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="stat-types" className="mb-12">
            <SectionTitle
              label="Stat Types"
              title="Different stats behave differently"
              text="Not every stat should be represented as one simple ladder. Some are single-value, some stack multiple values, and some require exceptions."
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {statTypes.map((type) => (
                <InfoPanel key={type.title} {...type} />
              ))}
            </div>
          </section>

          <section id="value-modes" className="mb-12">
            <SectionTitle
              label="Value Modes"
              title="How values connect to tiers"
              text="Some values directly use the Tiering System, while others use unique scales, NONE, UNKNOWN, or custom values."
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {valueModes.map((mode) => (
                <div
                  key={mode.title}
                  className="rounded-3xl border border-blue-300/15 bg-black/45 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-blue-300/40"
                >
                  <h3 className="text-xl font-bold text-blue-100">
                    {mode.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {mode.text}
                  </p>
                  <div className="mt-5 space-y-2">
                    {mode.examples.map((example) => (
                      <div
                        key={example}
                        className="rounded-xl bg-blue-300/[0.06] px-3 py-2 text-xs text-blue-100"
                      >
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            id="importance"
            className="mb-12 rounded-3xl border border-yellow-300/20 bg-black/45 p-7 shadow-[0_0_45px_rgba(234,179,8,0.08)] backdrop-blur-xl"
          >
            <SectionTitle
              label="Importance"
              title="How much a stat matters"
              text="Importance measures how relevant a stat or value is to the character’s scaling, combat, role, identity, or narrative function."
            />

            <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
              {importanceLevels.map(([name, text]) => (
                <div
                  key={name}
                  className="rounded-2xl border border-yellow-300/15 bg-yellow-300/[0.04] p-4"
                >
                  <h3 className="font-bold text-yellow-100">{name}</h3>
                  <p className="mt-3 text-xs leading-6 text-slate-300">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="dependencies" className="mb-12">
            <SectionTitle
              label="Dependencies"
              title="Stats can influence each other"
              text="A dependency means one stat may imply, constrain, support, bypass, or fail to imply another stat."
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dependencies.map((dependency) => (
                <InfoPanel
                  key={dependency.title}
                  title={dependency.title}
                  text={dependency.text}
                  example="Use notes when the relation is conditional."
                />
              ))}
            </div>
          </section>

          <section id="separation" className="mb-12">
            <SectionTitle
              label="Important Separation"
              title="AP, DC, Striking Strength, Hax, and Authority are not the same"
              text="This is the anti-bad-scaling part of the system. One strong stat does not automatically upgrade every other stat."
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {separationCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-3xl border border-red-300/15 bg-black/45 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-red-300/40 hover:bg-red-300/[0.05]"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-red-300/70">
                    {card.short}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-red-100">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="stat-categories" className="mb-12">
            <SectionTitle
              label="Stat Categories"
              title="Default stat groups"
              text="Each group keeps related stats together without merging them into one global number."
            />

            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveCategory(item.id);
                    setOpenStat(item.stats[0]?.name ?? null);
                  }}
                  className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                    activeCategory === item.id
                      ? "border-white/60 bg-white/15 text-white shadow-[0_0_18px_rgba(255,255,255,0.12)]"
                      : "border-white/10 bg-black/35 text-slate-300 hover:border-purple-300/40 hover:bg-purple-300/[0.08] hover:text-purple-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
              <div className="rounded-3xl border border-purple-300/20 bg-black/45 p-6 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.35em] text-purple-300/70">
                  Active Category
                </p>
                <h3 className="mt-3 text-3xl font-bold text-purple-100">
                  {category.label}
                </h3>
                <p className="mt-4 leading-8 text-slate-300">
                  {category.description}
                </p>
              </div>

              <div className="space-y-3">
                {category.stats.map((stat) => (
                  <div
                    key={stat.name}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-black/45 backdrop-blur-xl"
                  >
                    <button
                      onClick={() =>
                        setOpenStat(openStat === stat.name ? null : stat.name)
                      }
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/[0.04]"
                    >
                      <span className="font-semibold text-white">
                        {stat.name}
                      </span>
                      <span className="text-sm text-slate-400">
                        {openStat === stat.name ? "Close" : "Open"}
                      </span>
                    </button>

                    {openStat === stat.name && (
                      <div className="border-t border-white/10 px-5 py-5">
                        <p className="leading-7 text-slate-300">
                          {stat.description}
                        </p>

                        <div className="mt-5 grid gap-3 md:grid-cols-3">
                          <MiniField label="Type" value={stat.type} />
                          <MiniField
                            label="Value Mode"
                            value={stat.valueMode}
                          />
                          <MiniField
                            label="Importance"
                            value={stat.importance}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="authority-scale"
            className="mb-12 rounded-3xl border border-violet-300/20 bg-black/45 p-7 backdrop-blur-xl"
          >
            <SectionTitle
              label="Authority Scale"
              title="Rule supremacy is its own stat"
              text="Authority measures how deeply an entity can impose, rewrite, command, or override rules. Hax is an effect; Authority is rule supremacy."
            />

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {authorityScale.map(([name, tier]) => (
                <div
                  key={name}
                  className="grid grid-cols-[1fr_auto] gap-4 rounded-2xl border border-violet-300/15 bg-violet-300/[0.04] px-4 py-3"
                >
                  <span className="font-semibold text-violet-100">
                    {name}
                  </span>
                  <span className="text-sm text-slate-300">{tier}</span>
                </div>
              ))}
            </div>
          </section>

          <section
            id="resistance-scale"
            className="mb-12 rounded-3xl border border-emerald-300/20 bg-black/45 p-7 backdrop-blur-xl"
          >
            <SectionTitle
              label="Resistance Scale"
              title="Resistance is cumulative"
              text="Resistance is not one number. Each resistance type receives its own tier, importance, and notes."
            />

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {resistanceExamples.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-emerald-300/15 bg-emerald-300/[0.04] px-3 py-2 text-sm text-emerald-100"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section id="high-level-values" className="mb-12">
            <SectionTitle
              label="High-Level Values"
              title="Irrelevant, Inapplicable, and Absolute"
              text="Some values should not be treated as normal bigger numbers."
            />

            <div className="grid gap-4 md:grid-cols-3">
              <InfoPanel
                title="Irrelevant"
                text="The stat exists, but it no longer limits or meaningfully constrains the entity."
                example="Irrelevant Speed: distance and conventional movement no longer define motion."
              />
              <InfoPanel
                title="Inapplicable"
                text="The stat cannot meaningfully apply to the entity."
                example="Inapplicable Stamina: the entity does not use fatigue, energy, or biological function."
              />
              <InfoPanel
                title="Absolute"
                text="The stat is perfect beyond lower interpretation and belongs only to the absolute ceiling."
                example="Use Absolute very rarely."
              />
            </div>
          </section>

          <section
            id="custom-stats"
            className="mb-12 rounded-3xl border border-cyan-300/20 bg-black/45 p-7 backdrop-blur-xl"
          >
            <SectionTitle
              label="Custom Stats"
              title="Creating new stats later"
              text="The system should remain flexible. New stats can exist as long as they define their behavior clearly."
            />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.04] p-5">
                <h3 className="text-xl font-bold text-cyan-100">
                  Custom Progressive Stat
                </h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
                  <li>Select one value.</li>
                  <li>Assign or inherit a tier.</li>
                  <li>Select importance.</li>
                  <li>Add notes if interpretation matters.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-purple-300/15 bg-purple-300/[0.04] p-5">
                <h3 className="text-xl font-bold text-purple-100">
                  Custom Cumulative Stat
                </h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
                  <li>Add one or more values.</li>
                  <li>Each value receives its own tier.</li>
                  <li>Each value receives its own importance.</li>
                  <li>Each value may have notes.</li>
                </ul>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-yellow-300/15 bg-yellow-300/[0.04] p-5">
              <h3 className="text-xl font-bold text-yellow-100">
                UNKNOWN does not mean missing
              </h3>
              <p className="mt-3 leading-7 text-slate-300">
                UNKNOWN means the value exists, but cannot automatically be
                mapped to one stable tier. Later, the app should allow keeping
                UNKNOWN, manually assigning a tier, or adding notes.
              </p>
            </div>
          </section>

          <section
            id="example-profile"
            className="mb-20 rounded-3xl border border-red-300/20 bg-black/45 p-7 backdrop-blur-xl"
          >
            <SectionTitle
              label="Example Character"
              title="Dimensional Knight"
              text="A neutral example showing how one character can have different stats with different scaling relevance."
            />

            <div className="grid gap-5 lg:grid-cols-2">
              <ExampleBlock
                title="Physical"
                items={[
                  "Striking Strength: Continental — Major",
                  "Lifting Strength: Regional — Secondary",
                  "Durability: Planetary — Major",
                  "Stamina: Massive — Secondary",
                ]}
              />
              <ExampleBlock
                title="Speed"
                items={[
                  "Running Speed: Hypersonic+ — Secondary",
                  "Reaction Speed: Near-Instant — Core",
                  "Activation Speed: Superfast — Major",
                ]}
              />
              <ExampleBlock
                title="Combat"
                items={[
                  "Combat Skills: Master Fighter — Core",
                  "Defensive Capabilities: Expert Defense — Major",
                  "Accuracy: Ultra-Precise — Major",
                ]}
              />
              <ExampleBlock
                title="Power System"
                items={[
                  "Attack Potency: Planetary — Major",
                  "Maximum Attack Potency: Low Universal — Core",
                  "Destructive Capabilities: Regional — Secondary",
                  "Hax Potency: Universal — Core",
                  "Spatial Cutting — Universal — Core",
                  "Barrier Creation — Planetary — Major",
                  "Teleportation — Continental — Secondary",
                ]}
              />
              <ExampleBlock
                title="Metaphysical"
                items={[
                  "Ontological Level: Spatiotemporal Existence — Major",
                  "Authority: World Authority — Core",
                ]}
              />
              <ExampleBlock
                title="Resistance"
                items={[
                  "Space Manipulation Resistance — Universal — Core",
                  "Mind Manipulation Resistance — Planetary — Major",
                  "Soul Manipulation Resistance — Regional — Secondary",
                ]}
              />
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

function SectionTitle({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.35em] text-red-300/70">
        {label}
      </p>
      <h2 className="text-3xl font-bold text-white">{title}</h2>
      <p className="mt-3 max-w-4xl leading-7 text-slate-300">{text}</p>
    </div>
  );
}

function InfoPanel({
  title,
  text,
  example,
}: {
  title: string;
  text: string;
  example: string;
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-black/45 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/[0.04]">
      <h3 className="text-xl font-bold text-cyan-100">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{text}</p>
      <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs leading-6 text-slate-300">
        {example}
      </p>
    </article>
  );
}

function MiniField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-100">{value}</p>
    </div>
  );
}

function ExampleBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-red-300/15 bg-red-300/[0.04] p-5">
      <h3 className="text-xl font-bold text-red-100">{title}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm text-slate-300"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
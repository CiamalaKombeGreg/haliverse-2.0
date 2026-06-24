import type {
  Importance,
  StatCategoryDefinition,
  StatDefinition,
  StatDependency,
} from "./types";

import {
  ACCELERATION_SCALE,
  ACCURACY_SCALE,
  ACTIVATION_SPEED_SCALE,
  AGILITY_SCALE,
  AUTHORITY_SCALE,
  BODY_CONSTITUTION_SCALE,
  BODY_CONTROL_SCALE,
  CHARM_SCALE,
  COMBAT_SKILLS_SCALE,
  DEFENSIVE_CAPABILITIES_SCALE,
  DEXTERITY_SCALE,
  EMOTIONAL_CONTROL_SCALE,
  ENDURANCE_SCALE,
  EXISTENCE_TYPE_SCALE,
  GROWTH_SPEED_SCALE,
  INTELLIGENCE_SCALE,
  LEADERSHIP_SCALE,
  LEARNING_SPEED_SCALE,
  NARRATIVE_POSITION_SCALE,
  ONTOLOGICAL_LEVEL_SCALE,
  PERCEPTION_AWARENESS_SCALE,
  POWER_CAPABILITIES_SCALE,
  POWER_EFFICIENCY_SCALE,
  POWER_MASTERY_SCALE,
  POWER_RECOVERY_SCALE,
  POWER_RESERVES_SCALE,
  REACTION_SCALE,
  RESISTANCE_SCALE,
  SENSORY_ACCURACY_SCALE,
  SPEED_SCALE,
  STAMINA_SCALE,
  SYNERGY_SCALE,
  valuesFromTuples,
  VERSATILITY_SCALE,
  WILLPOWER_SCALE,
} from "./shared-scales";

export const DEFAULT_IMPORTANCE_VALUES = [
  "Flavor",
  "Minor",
  "Secondary",
  "Major",
  "Core",
  "Defining",
] as const satisfies readonly Importance[];

export const STAT_CATEGORIES = [
  {
    id: "physical",
    label: "Physical",
    description:
      "Body-based performance, physical force, resilience, stamina, and bodily nature.",
  },
  {
    id: "speed",
    label: "Speed",
    description:
      "Movement, travel, reaction, acceleration, agility, and activation timing.",
  },
  {
    id: "sensory",
    label: "Sensory",
    description:
      "Detection, range, clarity, precision, and awareness of information.",
  },
  {
    id: "intelligence",
    label: "Intelligence",
    description:
      "Knowledge, reasoning, battle thinking, creativity, learning, and experience.",
  },
  {
    id: "mental_social",
    label: "Mental / Social",
    description:
      "Willpower, emotional control, leadership, charm, and social influence.",
  },
  {
    id: "combat",
    label: "Combat",
    description:
      "Applied fighting skill, defense, accuracy, dexterity, versatility, and synergy.",
  },
  {
    id: "power_system",
    label: "Power System",
    description:
      "Power output, range, capabilities, reserves, recovery, efficiency, hax, and potential.",
  },
  {
    id: "metaphysical",
    label: "Metaphysical",
    description:
      "Existence, authority, narrative position, and ontological classification.",
  },
  {
    id: "resistance",
    label: "Resistance",
    description:
      "Effects the entity can withstand, ignore, reduce, counter, or remain unaffected by.",
  },
] as const satisfies readonly StatCategoryDefinition[];

export const GLOBAL_STAT_DEPENDENCIES = [
  {
    sourceStat: "striking_strength",
    targetStat: "attack_potency",
    relation: "implies_minimum",
    description:
      "If physical striking strength reaches a tier, Attack Potency is usually at least that tier for physical hits.",
  },
  {
    sourceStat: "attack_potency",
    targetStat: "striking_strength",
    relation: "does_not_imply",
    description:
      "Attack Potency can come from magic, energy, hax, technology, or weapons and does not automatically raise raw physical striking strength.",
  },
  {
    sourceStat: "attack_potency",
    targetStat: "destructive_capabilities",
    relation: "does_not_imply",
    description:
      "Concentrated damage can harm high-tier targets without destroying a matching area.",
  },
  {
    sourceStat: "destructive_capabilities",
    targetStat: "attack_potency",
    relation: "supports",
    description:
      "Environmental destruction can support AP scaling when the attack's damage is applicable to valid targets.",
  },
  {
    sourceStat: "sensory_range",
    targetStat: "perception_awareness",
    relation: "requires",
    description:
      "A character must sense something in some way before they can perceive or interpret it.",
  },
  {
    sourceStat: "sensory_accuracy",
    targetStat: "perception_awareness",
    relation: "supports",
    description:
      "Higher sensory accuracy improves the clarity and reliability of perception.",
  },
  {
    sourceStat: "hax_potency",
    targetStat: "durability",
    relation: "bypasses",
    description:
      "Hax may bypass raw durability without granting equivalent raw AP.",
  },
  {
    sourceStat: "authority",
    targetStat: "hax_potency",
    relation: "supports",
    description:
      "Authority can empower, suppress, or override hax depending on the rule layer being controlled.",
  },
  {
    sourceStat: "authority",
    targetStat: "resistance",
    relation: "bypasses",
    description:
      "Higher authority may override lower resistance if the target lacks resistance at the same rule level.",
  },
  {
    sourceStat: "ontological_level",
    targetStat: "resistance",
    relation: "supports",
    description:
      "A higher or unusual existence type may naturally resist effects that cannot reach that mode of existence.",
  },
] as const satisfies readonly StatDependency[];

function stat(definition: StatDefinition): StatDefinition {
  return definition;
}

export const DEFAULT_STAT_DEFINITIONS = [
  stat({
    id: "striking_strength",
    name: "Striking Strength",
    category: "physical",
    description:
      "How hard someone can hit with their strength alone.",
    type: "progressive",
    valueMode: "tiering_system",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Major",
    defaultValues: "tiering_system",
    addedByImprovedSystem: false,
  }),

  stat({
    id: "lifting_strength",
    name: "Lifting Strength",
    category: "physical",
    description:
      "How much someone can lift, hold, push, or restrain with their strength alone.",
    type: "progressive",
    valueMode: "tiering_system",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Secondary",
    recommendedImportanceRange: "Secondary",
    defaultValues: "tiering_system",
    addedByImprovedSystem: false,
  }),

  stat({
    id: "durability",
    name: "Durability",
    category: "physical",
    description:
      "Capability of an entity to receive and accumulate damage without being destroyed or killed.",
    type: "progressive",
    valueMode: "tiering_system",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Major",
    defaultValues: "tiering_system",
    addedByImprovedSystem: false,
  }),

  stat({
    id: "endurance",
    name: "Endurance",
    category: "physical",
    description:
      "Capability of an entity to keep functioning despite damage, body failure, fatigue, pain, or pressure.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Secondary",
    recommendedImportanceRange: "Secondary",
    defaultValues: valuesFromTuples(ENDURANCE_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "stamina",
    name: "Stamina",
    category: "physical",
    description:
      "Energy reserve and how long an entity can perform actions before exhausting itself.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Secondary",
    recommendedImportanceRange: "Secondary",
    defaultValues: valuesFromTuples(STAMINA_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "body_constitution",
    name: "Body Constitution",
    category: "physical",
    description:
      "Defines what a character is physically and existentially made of.",
    type: "cumulative",
    exclusive: true,
    valueMode: "unique_scale",
    importanceBehavior: "per_value",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Per value; usually Minor → Defining",
    defaultValues: valuesFromTuples(BODY_CONSTITUTION_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "body_control",
    name: "Body Control",
    category: "physical",
    description:
      "How well a character can control, regulate, and utilize their own body or interface.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "variable",
    recommendedDefaultImportance: "Secondary",
    recommendedImportanceRange: "Flavor → Defining, chosen by context",
    defaultValues: valuesFromTuples(BODY_CONTROL_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "running_speed",
    name: "Running Speed",
    category: "speed",
    description:
      "How fast a character can run or move through physical locomotion.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Secondary",
    recommendedImportanceRange: "Secondary",
    defaultValues: valuesFromTuples(SPEED_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "travel_speed",
    name: "Travel Speed",
    category: "speed",
    description:
      "How fast a character can cross large distances, independent of running form or combat agility.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Secondary",
    recommendedImportanceRange: "Secondary",
    defaultValues: valuesFromTuples(SPEED_SCALE),
    addedByImprovedSystem: true,
  }),

  stat({
    id: "acceleration",
    name: "Acceleration",
    category: "speed",
    description:
      "How long it takes the entity to reach maximum speed.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Secondary",
    recommendedImportanceRange: "Secondary",
    defaultValues: valuesFromTuples(ACCELERATION_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "agility",
    name: "Agility",
    category: "speed",
    description:
      "How fast and efficiently a character can move their body in combat situations.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Major",
    defaultValues: valuesFromTuples(AGILITY_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "reaction_speed",
    name: "Reaction Speed",
    category: "speed",
    description:
      "How fast a character can perceive a stimulus, process information, and initiate a response.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Major",
    defaultValues: valuesFromTuples(REACTION_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "activation_speed",
    name: "Activation Speed",
    category: "speed",
    description:
      "How quickly an ability, power, or effect is triggered after the user decides to use it.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Major",
    defaultValues: valuesFromTuples(ACTIVATION_SPEED_SCALE),
    addedByImprovedSystem: false,
    notes:
      "The static dataset listed this as uncategorized, but the Power System structure places Activation Speed under Speed.",
  }),

  stat({
    id: "perception_awareness",
    name: "Perception Awareness",
    category: "sensory",
    description:
      "How well an entity can detect, interpret, and understand surroundings, threats, and changes.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Major",
    defaultValues: valuesFromTuples(PERCEPTION_AWARENESS_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "sensory_range",
    name: "Sensory Range",
    category: "sensory",
    description:
      "Maximum distance or scale at which a character can detect stimuli.",
    type: "progressive",
    valueMode: "tiering_system",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Secondary",
    recommendedImportanceRange: "Secondary",
    defaultValues: "tiering_system",
    addedByImprovedSystem: false,
  }),

  stat({
    id: "sensory_accuracy",
    name: "Sensory Accuracy",
    category: "sensory",
    description:
      "How well a character correctly perceives and interprets information.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Major",
    defaultValues: valuesFromTuples(SENSORY_ACCURACY_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "global_intelligence",
    name: "Global Intelligence",
    category: "intelligence",
    description:
      "Broad knowledge, memory, learning capability, and overall understanding across domains.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Major",
    defaultValues: valuesFromTuples(INTELLIGENCE_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "logical_intelligence",
    name: "Logical Intelligence",
    category: "intelligence",
    description:
      "Reasoning, deduction, problem-solving, pattern recognition, and analytical depth.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Major",
    defaultValues: valuesFromTuples(INTELLIGENCE_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "battle_intelligence",
    name: "Battle Intelligence",
    category: "intelligence",
    description:
      "Combat thinking, adaptation, tactical decisions, reading opponents, and exploiting weaknesses.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Core",
    recommendedImportanceRange: "Core",
    defaultValues: valuesFromTuples(INTELLIGENCE_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "creative_intelligence",
    name: "Creative Intelligence",
    category: "intelligence",
    description:
      "Invention, design ability, scientific creativity, artistic creation, engineering, and unconventional problem-solving.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Major",
    defaultValues: valuesFromTuples(INTELLIGENCE_SCALE),
    addedByImprovedSystem: true,
  }),

  stat({
    id: "learning_speed",
    name: "Learning Speed",
    category: "intelligence",
    description:
      "How fast someone can learn in one or more intelligence categories.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Secondary",
    recommendedImportanceRange: "Secondary",
    defaultValues: valuesFromTuples(LEARNING_SPEED_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "experience",
    name: "Experience",
    category: "intelligence",
    description:
      "Quantity and diversity of events, situations, and interactions an entity has undergone.",
    type: "cumulative",
    exclusive: false,
    valueMode: "custom",
    importanceBehavior: "per_value",
    recommendedDefaultImportance: "Secondary",
    recommendedImportanceRange: "Per value; usually Minor → Defining",
    defaultValues: "custom",
    addedByImprovedSystem: false,
  }),

  stat({
    id: "willpower",
    name: "Willpower",
    category: "mental_social",
    description:
      "Resistance to internal and external mental influence such as fear, manipulation, illusions, mind control, and conceptual pressure.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Major",
    defaultValues: valuesFromTuples(WILLPOWER_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "emotional_control",
    name: "Emotional Control",
    category: "mental_social",
    description:
      "How well a character regulates fear, rage, panic, obsession, instability, and emotional influence.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Secondary",
    recommendedImportanceRange: "Secondary",
    defaultValues: valuesFromTuples(EMOTIONAL_CONTROL_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "leadership",
    name: "Leadership",
    category: "mental_social",
    description:
      "Leadership presence, group influence, and ability to inspire, dominate, command, or draw others.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "variable",
    recommendedDefaultImportance: "Secondary",
    recommendedImportanceRange: "Flavor → Defining, chosen by context",
    defaultValues: valuesFromTuples(LEADERSHIP_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "charm",
    name: "Charm",
    category: "mental_social",
    description:
      "Personal appeal in one-on-one or intimate interactions, including persuasion, seduction, and disarming presence.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Flavor",
    recommendedImportanceRange: "Flavor",
    defaultValues: valuesFromTuples(CHARM_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "dexterity",
    name: "Dexterity",
    category: "combat",
    description:
      "How well a character can perform tasks using hands or equivalent manipulators.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Secondary",
    recommendedImportanceRange: "Secondary",
    defaultValues: valuesFromTuples(DEXTERITY_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "accuracy",
    name: "Accuracy",
    category: "combat",
    description:
      "Correctness and precision of execution, including aim, consistency, repeatability, and control.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Major",
    defaultValues: valuesFromTuples(ACCURACY_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "combat_skills",
    name: "Combat Skills",
    category: "combat",
    description:
      "How well a character fights using martial arts, weapons, tactics, positioning, timing, and technique application.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Core",
    recommendedImportanceRange: "Core",
    defaultValues: valuesFromTuples(COMBAT_SKILLS_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "defensive_capabilities",
    name: "Defensive Capabilities",
    category: "combat",
    description:
      "How well a character avoids, blocks, redirects, counters, or nullifies incoming attacks through skill or active defense.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Major",
    defaultValues: valuesFromTuples(DEFENSIVE_CAPABILITIES_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "versatility",
    name: "Versatility",
    category: "combat",
    description:
      "How well a character can adapt, respond, and function across different situations using abilities, skills, and intellect.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Major",
    defaultValues: valuesFromTuples(VERSATILITY_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "synergy",
    name: "Synergy",
    category: "combat",
    description:
      "How well a character’s abilities, skills, stats, and systems work together as a unified whole.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "variable",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Flavor → Defining, chosen by context",
    defaultValues: valuesFromTuples(SYNERGY_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "attack_potency",
    name: "Attack Potency",
    category: "power_system",
    description:
      "Consistent damage output: how much force or effective destructive power attacks can apply against valid targets.",
    type: "progressive",
    valueMode: "tiering_system",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Major",
    defaultValues: "tiering_system",
    addedByImprovedSystem: false,
  }),

  stat({
    id: "maximum_attack_potency",
    name: "Maximum Attack Potency",
    category: "power_system",
    description:
      "Highest attack output a character can produce under peak conditions, even if not sustainable or normally repeatable.",
    type: "progressive",
    valueMode: "tiering_system",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Core",
    recommendedImportanceRange: "Core",
    defaultValues: "tiering_system",
    addedByImprovedSystem: false,
  }),

  stat({
    id: "destructive_capabilities",
    name: "Destructive Capabilities",
    category: "power_system",
    description:
      "Spread of damage created in the environment: area or structure destroyed, not merely concentrated damage.",
    type: "progressive",
    valueMode: "tiering_system",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Secondary",
    recommendedImportanceRange: "Secondary",
    defaultValues: "tiering_system",
    addedByImprovedSystem: false,
  }),

  stat({
    id: "application_range",
    name: "Application Range",
    category: "power_system",
    description:
      "Maximum distance at which a character or ability can affect a target.",
    type: "progressive",
    valueMode: "tiering_system",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Major",
    defaultValues: "tiering_system",
    addedByImprovedSystem: false,
  }),

  stat({
    id: "area_of_effect",
    name: "Area of Effect",
    category: "power_system",
    description:
      "Size of the impact zone affected by an attack, technique, field, or phenomenon.",
    type: "progressive",
    valueMode: "tiering_system",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Secondary",
    recommendedImportanceRange: "Secondary",
    defaultValues: "tiering_system",
    addedByImprovedSystem: false,
  }),

  stat({
    id: "global_potential",
    name: "Global Potential",
    category: "power_system",
    description:
      "Maximum level a character or system could plausibly reach under its own rules, conditions, and growth mechanics.",
    type: "progressive",
    valueMode: "tiering_system",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Core",
    recommendedImportanceRange: "Core",
    defaultValues: "tiering_system",
    addedByImprovedSystem: false,
  }),

  stat({
    id: "growth_speed",
    name: "Growth Speed",
    category: "power_system",
    description:
      "How quickly a character improves, evolves, adapts, or increases in power over time.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Major",
    defaultValues: valuesFromTuples(GROWTH_SPEED_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "power_mastery",
    name: "Power Mastery",
    category: "power_system",
    description:
      "How well a user controls, understands, and applies their power system in practice.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "variable",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Flavor → Defining, chosen by context",
    defaultValues: valuesFromTuples(POWER_MASTERY_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "power_capabilities",
    name: "Power Capabilities",
    category: "power_system",
    description:
      "What the power can actually do, the effects it can produce, and applications available right now.",
    type: "cumulative",
    exclusive: false,
    valueMode: "unique_scale",
    importanceBehavior: "per_value",
    recommendedDefaultImportance: "Core",
    recommendedImportanceRange: "Per value; usually Minor → Defining",
    defaultValues: valuesFromTuples(POWER_CAPABILITIES_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "power_potential",
    name: "Power Potential",
    category: "power_system",
    description:
      "Maximum evolution, expansion, and refinement a specific power system can theoretically reach.",
    type: "progressive",
    valueMode: "tiering_system",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Core",
    recommendedImportanceRange: "Core",
    defaultValues: "tiering_system",
    addedByImprovedSystem: false,
  }),

  stat({
    id: "power_reserves",
    name: "Power Reserves",
    category: "power_system",
    description:
      "Total amount of usable energy or fuel a character has for their power system.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "variable",
    recommendedDefaultImportance: "Secondary",
    recommendedImportanceRange: "Flavor → Defining, chosen by context",
    defaultValues: valuesFromTuples(POWER_RESERVES_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "power_recovery",
    name: "Power Recovery",
    category: "power_system",
    description:
      "How quickly a character can restore energy, reserves, or system function after usage or depletion.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Secondary",
    recommendedImportanceRange: "Secondary",
    defaultValues: valuesFromTuples(POWER_RECOVERY_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "power_efficiency",
    name: "Power Efficiency",
    category: "power_system",
    description:
      "How well a character converts energy into output with minimal waste.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "variable",
    recommendedDefaultImportance: "Secondary",
    recommendedImportanceRange: "Flavor → Defining, chosen by context",
    defaultValues: valuesFromTuples(POWER_EFFICIENCY_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "hax_potency",
    name: "Hax Potency",
    category: "power_system",
    description:
      "Strength and effectiveness of non-physical, rule-breaking, bypass-oriented, or metaphysical effects.",
    type: "progressive",
    valueMode: "tiering_system",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Core",
    recommendedImportanceRange: "Core",
    defaultValues: "tiering_system",
    addedByImprovedSystem: false,
  }),

  stat({
    id: "ontological_level",
    name: "Ontological Level",
    category: "metaphysical",
    description:
      "Nature of existence of a being and how fundamentally real, abstract, or transcendent it is relative to reality.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Defining",
    recommendedImportanceRange: "Defining",
    defaultValues: valuesFromTuples(ONTOLOGICAL_LEVEL_SCALE),
    addedByImprovedSystem: false,
  }),

  stat({
    id: "authority",
    name: "Authority",
    category: "metaphysical",
    description:
      "How deeply an entity can impose, rewrite, command, or override rules of a system, world, dimension, concept, cosmology, or narrative.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Core",
    recommendedImportanceRange: "Major → Defining",
    defaultValues: valuesFromTuples(AUTHORITY_SCALE),
    addedByImprovedSystem: true,
  }),

  stat({
    id: "narrative_position",
    name: "Narrative Position",
    category: "metaphysical",
    description:
      "How an entity relates to narrative layers, story hierarchy, fictionality, meta-structure, and transcendence.",
    type: "progressive",
    valueMode: "unique_scale",
    importanceBehavior: "fixed",
    recommendedDefaultImportance: "Defining",
    recommendedImportanceRange: "Core → Defining",
    defaultValues: valuesFromTuples(NARRATIVE_POSITION_SCALE),
    addedByImprovedSystem: true,
  }),

  stat({
    id: "existence_type",
    name: "Existence Type",
    category: "metaphysical",
    description:
      "Classifies the kind of existence the being has, such as physical, conceptual, abstract, virtual, dimensional, narrative, or non-existent.",
    type: "cumulative",
    exclusive: true,
    valueMode: "unique_scale",
    importanceBehavior: "per_value",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Per value; usually Major → Defining",
    defaultValues: valuesFromTuples(EXISTENCE_TYPE_SCALE),
    addedByImprovedSystem: true,
  }),

  stat({
    id: "resistance",
    name: "Resistance",
    category: "resistance",
    description:
      "What kinds of effects a character can withstand, reduce, ignore, counter, or remain unaffected by.",
    type: "cumulative",
    exclusive: false,
    valueMode: "custom",
    importanceBehavior: "per_value",
    recommendedDefaultImportance: "Major",
    recommendedImportanceRange: "Per value; usually Minor → Defining",
    defaultValues: valuesFromTuples(RESISTANCE_SCALE),
    addedByImprovedSystem: true,
  }),
] as const satisfies readonly StatDefinition[];
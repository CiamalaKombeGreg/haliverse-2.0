export type StatCategory =
  | "physical"
  | "speed"
  | "sensory"
  | "intelligence"
  | "mental_social"
  | "combat"
  | "power_system"
  | "metaphysical"
  | "resistance";

export type StatType =
  | "progressive"
  | "cumulative";

export type ValueMode =
  | "tiering_system"
  | "unique_scale"
  | "non_tiered"
  | "contextual_unknown"
  | "custom";

export type Importance =
  | "Flavor"
  | "Minor"
  | "Secondary"
  | "Major"
  | "Core"
  | "Defining";

export type TierValue = string | "NONE" | "UNKNOWN";

export type ImportanceBehavior =
  | "fixed"
  | "variable"
  | "per_value";

export type StatDependencyRelation =
  | "implies_minimum"
  | "supports"
  | "requires"
  | "does_not_imply"
  | "bypasses";

export type StatValueDefinition = {
  label: string;
  tier: TierValue;
  description?: string;
};

export type StatDependency = {
  sourceStat: string;
  targetStat: string;
  relation: StatDependencyRelation;
  description: string;
};

export type StatDefinition = {
  id: string;
  name: string;
  category: StatCategory;
  description: string;

  /**
   * Progressive:
   * - one selected value at a time.
   *
   * Cumulative:
   * - multiple values can coexist.
   */
  type: StatType;

  /**
   * tiering_system:
   * - values come from the Haliverse Tiering System.
   *
   * unique_scale:
   * - values come from a dedicated scale.
   *
   * non_tiered:
   * - values should not receive a tier.
   *
   * contextual_unknown:
   * - values exist, but automatic tier mapping is unsafe.
   *
   * custom:
   * - user-defined values.
   */
  valueMode: ValueMode;

  /**
   * Used for special cumulative stats like Body Constitution
   * or Existence Type where contradictory values may need justification.
   */
  exclusive?: boolean;

  /**
   * fixed:
   * - the stat usually keeps one recommended importance.
   *
   * variable:
   * - importance depends on the character/context.
   *
   * per_value:
   * - each cumulative value has its own importance.
   */
  importanceBehavior: ImportanceBehavior;

  recommendedDefaultImportance?: Importance;
  recommendedImportanceRange?: string;

  /**
   * Either:
   * - an actual list of values
   * - "tiering_system" for stats that use the full cosmology tier list
   * - "custom" for user-created stacks
   */
  defaultValues?: StatValueDefinition[] | "tiering_system" | "custom";

  dependencies?: StatDependency[];

  /**
   * Keep this because your dataset distinguishes original stats
   * from improved-system additions.
   */
  addedByImprovedSystem?: boolean;

  /**
   * Useful later for migration, editor hints, and wiki display.
   */
  notes?: string;
};

export type CharacterProgressiveStat = {
  statId: string;
  value: string;
  tier: TierValue;
  importance: Importance;
  notes?: string;
};

export type CharacterCumulativeStatValue = {
  label: string;
  tier: TierValue;
  importance: Importance;
  notes?: string;
};

export type CharacterCumulativeStat = {
  statId: string;
  values: CharacterCumulativeStatValue[];
};

export type CharacterStat =
  | CharacterProgressiveStat
  | CharacterCumulativeStat;

export type StatCategoryDefinition = {
  id: StatCategory;
  label: string;
  description: string;
};
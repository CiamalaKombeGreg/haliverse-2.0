import { PrismaClient } from "@prisma/client";
import {
  DEFAULT_STAT_DEFINITIONS,
  GLOBAL_STAT_DEPENDENCIES,
  STAT_CATEGORIES,
} from "../src/lib/power-system";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Seeding Haliverse power-system static dataset...");

  await seedCategories();const prisma = new PrismaClient({adapter});
  await seedStatDefinitions();
  await seedDependencies();

  console.log("Seed complete.");
}

async function seedCategories() {
  for (const [index, category] of STAT_CATEGORIES.entries()) {
    await prisma.statCategoryInfo.upsert({
      where: {
        id: category.id,
      },
      update: {
        label: category.label,
        description: category.description,
        order: index,
      },
      create: {
        id: category.id,
        label: category.label,
        description: category.description,
        order: index,
      },
    });
  }
}

async function seedStatDefinitions() {
  for (const definition of DEFAULT_STAT_DEFINITIONS) {
    await prisma.statDefinition.upsert({
      where: {
        id: definition.id,
      },
      update: {
        name: definition.name,
        category: definition.category,
        description: definition.description,
        type: definition.type,
        valueMode: definition.valueMode,
        exclusive: definition.exclusive ?? false,
        importanceBehavior: definition.importanceBehavior,
        recommendedDefaultImportance:
          definition.recommendedDefaultImportance ?? null,
        recommendedImportanceRange:
          definition.recommendedImportanceRange ?? null,
        usesTieringSystemValues: definition.defaultValues === "tiering_system",
        usesCustomValues: definition.defaultValues === "custom",
        addedByImprovedSystem: definition.addedByImprovedSystem ?? false,
        notes: definition.notes ?? null,
      },
      create: {
        id: definition.id,
        name: definition.name,
        category: definition.category,
        description: definition.description,
        type: definition.type,
        valueMode: definition.valueMode,
        exclusive: definition.exclusive ?? false,
        importanceBehavior: definition.importanceBehavior,
        recommendedDefaultImportance:
          definition.recommendedDefaultImportance ?? null,
        recommendedImportanceRange:
          definition.recommendedImportanceRange ?? null,
        usesTieringSystemValues: definition.defaultValues === "tiering_system",
        usesCustomValues: definition.defaultValues === "custom",
        addedByImprovedSystem: definition.addedByImprovedSystem ?? false,
        notes: definition.notes ?? null,
      },
    });

    await seedStatValues(definition);
  }
}

async function seedStatValues(
  definition: (typeof DEFAULT_STAT_DEFINITIONS)[number],
) {
  if (
    definition.defaultValues === undefined ||
    definition.defaultValues === "tiering_system" ||
    definition.defaultValues === "custom"
  ) {
    await prisma.statValueDefinition.deleteMany({
      where: {
        statDefinitionId: definition.id,
      },
    });

    return;
  }

  const currentLabels = definition.defaultValues.map((value) => value.label);

  await prisma.statValueDefinition.deleteMany({
    where: {
      statDefinitionId: definition.id,
      label: {
        notIn: currentLabels,
      },
    },
  });

  for (const [index, value] of definition.defaultValues.entries()) {
    await prisma.statValueDefinition.upsert({
      where: {
        statDefinitionId_label: {
          statDefinitionId: definition.id,
          label: value.label,
        },
      },
      update: {
        tier: value.tier,
        description: value.description ?? null,
        order: index,
      },
      create: {
        statDefinitionId: definition.id,
        label: value.label,
        tier: value.tier,
        description: value.description ?? null,
        order: index,
      },
    });
  }
}

async function seedDependencies() {
  for (const dependency of GLOBAL_STAT_DEPENDENCIES) {
    await prisma.statDependency.upsert({
      where: {
        sourceStatId_targetStatId_relation: {
          sourceStatId: dependency.sourceStat,
          targetStatId: dependency.targetStat,
          relation: dependency.relation,
        },
      },
      update: {
        description: dependency.description,
      },
      create: {
        sourceStatId: dependency.sourceStat,
        targetStatId: dependency.targetStat,
        relation: dependency.relation,
        description: dependency.description,
      },
    });
  }
}

main()
  .catch((error) => {
    console.error("Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
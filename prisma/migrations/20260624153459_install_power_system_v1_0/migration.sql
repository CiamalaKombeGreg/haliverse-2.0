-- CreateEnum
CREATE TYPE "StatCategory" AS ENUM ('physical', 'speed', 'sensory', 'intelligence', 'mental_social', 'combat', 'power_system', 'metaphysical', 'resistance');

-- CreateEnum
CREATE TYPE "StatType" AS ENUM ('progressive', 'cumulative');

-- CreateEnum
CREATE TYPE "ValueMode" AS ENUM ('tiering_system', 'unique_scale', 'non_tiered', 'contextual_unknown', 'custom');

-- CreateEnum
CREATE TYPE "Importance" AS ENUM ('Flavor', 'Minor', 'Secondary', 'Major', 'Core', 'Defining');

-- CreateEnum
CREATE TYPE "ImportanceBehavior" AS ENUM ('fixed', 'variable', 'per_value');

-- CreateEnum
CREATE TYPE "TierSpecialValue" AS ENUM ('NONE', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "StatDependencyRelation" AS ENUM ('implies_minimum', 'supports', 'requires', 'does_not_imply', 'bypasses');

-- CreateTable
CREATE TABLE "StatDefinition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "StatCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "type" "StatType" NOT NULL,
    "valueMode" "ValueMode" NOT NULL,
    "exclusive" BOOLEAN NOT NULL DEFAULT false,
    "importanceBehavior" "ImportanceBehavior" NOT NULL,
    "recommendedDefaultImportance" "Importance",
    "recommendedImportanceRange" TEXT,
    "usesTieringSystemValues" BOOLEAN NOT NULL DEFAULT false,
    "usesCustomValues" BOOLEAN NOT NULL DEFAULT false,
    "addedByImprovedSystem" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StatDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatValueDefinition" (
    "id" TEXT NOT NULL,
    "statDefinitionId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StatValueDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatDependency" (
    "id" TEXT NOT NULL,
    "sourceStatId" TEXT NOT NULL,
    "targetStatId" TEXT NOT NULL,
    "relation" "StatDependencyRelation" NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StatDependency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatCategoryInfo" (
    "id" "StatCategory" NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StatCategoryInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StatDefinition_category_idx" ON "StatDefinition"("category");

-- CreateIndex
CREATE INDEX "StatDefinition_type_idx" ON "StatDefinition"("type");

-- CreateIndex
CREATE INDEX "StatDefinition_valueMode_idx" ON "StatDefinition"("valueMode");

-- CreateIndex
CREATE INDEX "StatValueDefinition_statDefinitionId_idx" ON "StatValueDefinition"("statDefinitionId");

-- CreateIndex
CREATE INDEX "StatValueDefinition_tier_idx" ON "StatValueDefinition"("tier");

-- CreateIndex
CREATE UNIQUE INDEX "StatValueDefinition_statDefinitionId_label_key" ON "StatValueDefinition"("statDefinitionId", "label");

-- CreateIndex
CREATE INDEX "StatDependency_sourceStatId_idx" ON "StatDependency"("sourceStatId");

-- CreateIndex
CREATE INDEX "StatDependency_targetStatId_idx" ON "StatDependency"("targetStatId");

-- CreateIndex
CREATE UNIQUE INDEX "StatDependency_sourceStatId_targetStatId_relation_key" ON "StatDependency"("sourceStatId", "targetStatId", "relation");

-- AddForeignKey
ALTER TABLE "StatValueDefinition" ADD CONSTRAINT "StatValueDefinition_statDefinitionId_fkey" FOREIGN KEY ("statDefinitionId") REFERENCES "StatDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatDependency" ADD CONSTRAINT "StatDependency_sourceStatId_fkey" FOREIGN KEY ("sourceStatId") REFERENCES "StatDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatDependency" ADD CONSTRAINT "StatDependency_targetStatId_fkey" FOREIGN KEY ("targetStatId") REFERENCES "StatDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

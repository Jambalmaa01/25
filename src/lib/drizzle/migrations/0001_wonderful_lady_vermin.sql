ALTER TYPE "directions" ADD VALUE '';--> statement-breakpoint
ALTER TYPE "zones" ADD VALUE '';--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_name_unique";--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "length_responsible_border" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "length_dry_land" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "length_water_boundary" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "distance_from_border" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "distance_from_western" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "distance_from_eastern" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "distance_from_western_neighbor_detachment" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "distance_from_eastern_neighbor_detachment" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "distance_from_ulaanbaatar" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "distance_from_city" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "distance_from_district" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_identity_number_unique" UNIQUE("identity_number");
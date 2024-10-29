ALTER TABLE "departments" ADD COLUMN "identity_number" varchar(4);--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "zone" "zones";--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "direction" "directions";--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "establishmented_date" date;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "ranking" varchar;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "electric_power_source" varchar;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "beverage_source" varchar;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "beverage_source_number" varchar;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "length_responsible_border" double precision;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "length_dry_land" double precision;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "length_water_boundary" double precision;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "distance_from_border" double precision;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "distance_from_western" double precision;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "distance_from_eastern" double precision;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "distance_from_detachment" double precision;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "distance_from_district" double precision;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "network_mobicom" boolean;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "network_skytel" boolean;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "network_unitel" boolean;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "network_gmobile" boolean;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "network_vsat" boolean;--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_identity_number_unique" UNIQUE("identity_number");
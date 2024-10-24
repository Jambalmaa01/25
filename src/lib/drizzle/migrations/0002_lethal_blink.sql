ALTER TABLE "cities" DROP CONSTRAINT "cities_name_unique";--> statement-breakpoint
ALTER TABLE "cities" DROP CONSTRAINT "cities_code_name_unique";--> statement-breakpoint
ALTER TABLE "districts" DROP CONSTRAINT "districts_name_unique";--> statement-breakpoint
ALTER TABLE "districts" DROP CONSTRAINT "districts_code_name_unique";--> statement-breakpoint
ALTER TABLE "ranks" DROP CONSTRAINT "ranks_name_unique";--> statement-breakpoint
ALTER TABLE "employees" DROP CONSTRAINT "employees_role_id_roles_id_fk";
--> statement-breakpoint
ALTER TABLE "cities" ALTER COLUMN "country_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "districts" ALTER COLUMN "city_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ranks" ALTER COLUMN "rank_group_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "roles" ALTER COLUMN "added_by" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "districts" ADD COLUMN "country_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "ranks" ADD COLUMN "short_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "districts" ADD CONSTRAINT "districts_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "employees" DROP COLUMN IF EXISTS "role_id";--> statement-breakpoint
ALTER TABLE "cities" ADD CONSTRAINT "city_name_unique_idx" UNIQUE("country_id","name");--> statement-breakpoint
ALTER TABLE "districts" ADD CONSTRAINT "district_name_unique_idx" UNIQUE("country_id","city_id","name");
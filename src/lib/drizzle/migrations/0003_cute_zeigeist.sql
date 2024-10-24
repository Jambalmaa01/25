CREATE TABLE IF NOT EXISTS "positions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"code_name" varchar(255) NOT NULL,
	"added_at" timestamp NOT NULL,
	"edited_at" timestamp,
	"removed_at" timestamp,
	"added_by" uuid NOT NULL,
	"edited_by" uuid,
	"removed_by" uuid,
	CONSTRAINT "positions_name_unique" UNIQUE("name"),
	CONSTRAINT "positions_code_name_unique" UNIQUE("code_name")
);
--> statement-breakpoint
ALTER TABLE "border_out_points" RENAME TO "departments";--> statement-breakpoint
ALTER TABLE "border_points" RENAME TO "organizations";--> statement-breakpoint
ALTER TABLE "employee_migrations" RENAME COLUMN "came_date_at_border_point" TO "organization_came_date";--> statement-breakpoint
ALTER TABLE "employee_migrations" RENAME COLUMN "came_date_at_border_out_point" TO "department_came_date";--> statement-breakpoint
ALTER TABLE "employee_migrations" RENAME COLUMN "went_date_at_border_point" TO "organization_went_date";--> statement-breakpoint
ALTER TABLE "employee_migrations" RENAME COLUMN "went_date_at_border_out_point" TO "department_went_date";--> statement-breakpoint
ALTER TABLE "departments" DROP CONSTRAINT "border_out_points_name_unique";--> statement-breakpoint
ALTER TABLE "departments" DROP CONSTRAINT "border_out_points_code_name_unique";--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "border_points_name_unique";--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "border_points_code_name_unique";--> statement-breakpoint
ALTER TABLE "departments" DROP CONSTRAINT "border_out_points_country_id_countries_id_fk";
--> statement-breakpoint
ALTER TABLE "departments" DROP CONSTRAINT "border_out_points_city_id_cities_id_fk";
--> statement-breakpoint
ALTER TABLE "departments" DROP CONSTRAINT "border_out_points_district_id_districts_id_fk";
--> statement-breakpoint
ALTER TABLE "departments" DROP CONSTRAINT "border_out_points_added_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "departments" DROP CONSTRAINT "border_out_points_edited_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "departments" DROP CONSTRAINT "border_out_points_removed_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "border_points_country_id_countries_id_fk";
--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "border_points_city_id_cities_id_fk";
--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "border_points_district_id_districts_id_fk";
--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "border_points_added_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "border_points_edited_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "border_points_removed_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "employee_migrations" DROP CONSTRAINT "employee_migrations_role_id_roles_id_fk";
--> statement-breakpoint
ALTER TABLE "departments" ALTER COLUMN "country_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "departments" ALTER COLUMN "city_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "departments" ALTER COLUMN "district_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "country_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "city_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "district_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "departments" ADD COLUMN "orgnaization_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "employee_migrations" ADD COLUMN "organization_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "employee_migrations" ADD COLUMN "department_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "employee_migrations" ADD COLUMN "position_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "organization_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "department_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "position_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "positions" ADD CONSTRAINT "positions_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "positions" ADD CONSTRAINT "positions_edited_by_users_id_fk" FOREIGN KEY ("edited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "positions" ADD CONSTRAINT "positions_removed_by_users_id_fk" FOREIGN KEY ("removed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "departments" ADD CONSTRAINT "departments_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "departments" ADD CONSTRAINT "departments_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "departments" ADD CONSTRAINT "departments_district_id_districts_id_fk" FOREIGN KEY ("district_id") REFERENCES "public"."districts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "departments" ADD CONSTRAINT "departments_orgnaization_id_organizations_id_fk" FOREIGN KEY ("orgnaization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "departments" ADD CONSTRAINT "departments_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "departments" ADD CONSTRAINT "departments_edited_by_users_id_fk" FOREIGN KEY ("edited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "departments" ADD CONSTRAINT "departments_removed_by_users_id_fk" FOREIGN KEY ("removed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_district_id_districts_id_fk" FOREIGN KEY ("district_id") REFERENCES "public"."districts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_edited_by_users_id_fk" FOREIGN KEY ("edited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_removed_by_users_id_fk" FOREIGN KEY ("removed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_migrations" ADD CONSTRAINT "employee_migrations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_migrations" ADD CONSTRAINT "employee_migrations_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_migrations" ADD CONSTRAINT "employee_migrations_position_id_positions_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."positions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_position_id_positions_id_fk" FOREIGN KEY ("position_id") REFERENCES "public"."positions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "employee_migrations" DROP COLUMN IF EXISTS "role_id";--> statement-breakpoint
ALTER TABLE "departments" ADD CONSTRAINT "departments_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_code_name_unique" UNIQUE("code_name");
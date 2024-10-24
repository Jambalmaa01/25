CREATE TABLE IF NOT EXISTS "border_out_points" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"code_name" varchar(255) NOT NULL,
	"geom" geometry(GEOMETRYCOLLECTION, 4326) NOT NULL,
	"country_id" uuid,
	"city_id" uuid,
	"district_id" uuid,
	"added_at" timestamp NOT NULL,
	"edited_at" timestamp,
	"removed_at" timestamp,
	"added_by" uuid NOT NULL,
	"edited_by" uuid,
	"removed_by" uuid,
	CONSTRAINT "border_out_points_name_unique" UNIQUE("name"),
	CONSTRAINT "border_out_points_code_name_unique" UNIQUE("code_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "border_points" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"code_name" varchar(255) NOT NULL,
	"geom" geometry(GEOMETRYCOLLECTION, 4326) NOT NULL,
	"country_id" uuid,
	"city_id" uuid,
	"district_id" uuid,
	"added_at" timestamp NOT NULL,
	"edited_at" timestamp,
	"removed_at" timestamp,
	"added_by" uuid NOT NULL,
	"edited_by" uuid,
	"removed_by" uuid,
	CONSTRAINT "border_points_name_unique" UNIQUE("name"),
	CONSTRAINT "border_points_code_name_unique" UNIQUE("code_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"code_name" varchar(255) NOT NULL,
	"country_id" uuid,
	"added_at" timestamp NOT NULL,
	"edited_at" timestamp,
	"removed_at" timestamp,
	"added_by" uuid NOT NULL,
	"edited_by" uuid,
	"removed_by" uuid,
	CONSTRAINT "cities_name_unique" UNIQUE("name"),
	CONSTRAINT "cities_code_name_unique" UNIQUE("code_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "countries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"code_name" varchar(255) NOT NULL,
	"added_at" timestamp NOT NULL,
	"edited_at" timestamp,
	"removed_at" timestamp,
	"added_by" uuid NOT NULL,
	"edited_by" uuid,
	"removed_by" uuid,
	CONSTRAINT "countries_name_unique" UNIQUE("name"),
	CONSTRAINT "countries_code_name_unique" UNIQUE("code_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "districts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"code_name" varchar(255) NOT NULL,
	"city_id" uuid,
	"added_at" timestamp NOT NULL,
	"edited_at" timestamp,
	"removed_at" timestamp,
	"added_by" uuid NOT NULL,
	"edited_by" uuid,
	"removed_by" uuid,
	CONSTRAINT "districts_name_unique" UNIQUE("name"),
	CONSTRAINT "districts_code_name_unique" UNIQUE("code_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employee_migrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"identity_number" varchar(4) NOT NULL,
	"rank_group_id" uuid NOT NULL,
	"came_date_at_border_point" date NOT NULL,
	"came_date_at_border_out_point" date NOT NULL,
	"went_date_at_border_point" date,
	"went_date_at_border_out_point" date,
	"rank_id" uuid NOT NULL,
	"role_id" uuid NOT NULL,
	"employee_id" uuid NOT NULL,
	"added_at" timestamp NOT NULL,
	"edited_at" timestamp,
	"removed_at" timestamp,
	"added_by" uuid NOT NULL,
	"edited_by" uuid,
	"removed_by" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nationality" varchar(255) NOT NULL,
	"family_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"country_id" uuid NOT NULL,
	"city_id" uuid NOT NULL,
	"district_id" uuid NOT NULL,
	"rank_group_id" uuid NOT NULL,
	"rank_id" uuid NOT NULL,
	"role_id" uuid NOT NULL,
	"birth_date" date NOT NULL,
	"added_at" timestamp NOT NULL,
	"edited_at" timestamp,
	"removed_at" timestamp,
	"added_by" uuid NOT NULL,
	"edited_by" uuid,
	"removed_by" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rank_groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"code_name" varchar(255) NOT NULL,
	"added_at" timestamp NOT NULL,
	"edited_at" timestamp,
	"removed_at" timestamp,
	"added_by" uuid NOT NULL,
	"edited_by" uuid,
	"removed_by" uuid,
	CONSTRAINT "rank_groups_name_unique" UNIQUE("name"),
	CONSTRAINT "rank_groups_code_name_unique" UNIQUE("code_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ranks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"code_name" varchar(255) NOT NULL,
	"rank_group_id" uuid,
	"added_at" timestamp NOT NULL,
	"edited_at" timestamp,
	"removed_at" timestamp,
	"added_by" uuid NOT NULL,
	"edited_by" uuid,
	"removed_by" uuid,
	CONSTRAINT "ranks_name_unique" UNIQUE("name"),
	CONSTRAINT "ranks_code_name_unique" UNIQUE("code_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"code_name" varchar(255) NOT NULL,
	"added_at" timestamp NOT NULL,
	"edited_at" timestamp,
	"removed_at" timestamp,
	"added_by" uuid NOT NULL,
	"edited_by" uuid,
	"removed_by" uuid,
	CONSTRAINT "roles_name_unique" UNIQUE("name"),
	CONSTRAINT "roles_code_name_unique" UNIQUE("code_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(36) NOT NULL,
	"password" varchar(1024) NOT NULL,
	"employee_id" uuid,
	"added_at" timestamp NOT NULL,
	"edited_at" timestamp,
	"removed_at" timestamp,
	"added_by" uuid,
	"edited_by" uuid,
	"removed_by" uuid,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "border_out_points" ADD CONSTRAINT "border_out_points_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "border_out_points" ADD CONSTRAINT "border_out_points_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "border_out_points" ADD CONSTRAINT "border_out_points_district_id_districts_id_fk" FOREIGN KEY ("district_id") REFERENCES "public"."districts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "border_out_points" ADD CONSTRAINT "border_out_points_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "border_out_points" ADD CONSTRAINT "border_out_points_edited_by_users_id_fk" FOREIGN KEY ("edited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "border_out_points" ADD CONSTRAINT "border_out_points_removed_by_users_id_fk" FOREIGN KEY ("removed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "border_points" ADD CONSTRAINT "border_points_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "border_points" ADD CONSTRAINT "border_points_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "border_points" ADD CONSTRAINT "border_points_district_id_districts_id_fk" FOREIGN KEY ("district_id") REFERENCES "public"."districts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "border_points" ADD CONSTRAINT "border_points_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "border_points" ADD CONSTRAINT "border_points_edited_by_users_id_fk" FOREIGN KEY ("edited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "border_points" ADD CONSTRAINT "border_points_removed_by_users_id_fk" FOREIGN KEY ("removed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cities" ADD CONSTRAINT "cities_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cities" ADD CONSTRAINT "cities_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cities" ADD CONSTRAINT "cities_edited_by_users_id_fk" FOREIGN KEY ("edited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cities" ADD CONSTRAINT "cities_removed_by_users_id_fk" FOREIGN KEY ("removed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "countries" ADD CONSTRAINT "countries_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "countries" ADD CONSTRAINT "countries_edited_by_users_id_fk" FOREIGN KEY ("edited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "countries" ADD CONSTRAINT "countries_removed_by_users_id_fk" FOREIGN KEY ("removed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "districts" ADD CONSTRAINT "districts_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "districts" ADD CONSTRAINT "districts_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "districts" ADD CONSTRAINT "districts_edited_by_users_id_fk" FOREIGN KEY ("edited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "districts" ADD CONSTRAINT "districts_removed_by_users_id_fk" FOREIGN KEY ("removed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_migrations" ADD CONSTRAINT "employee_migrations_rank_group_id_rank_groups_id_fk" FOREIGN KEY ("rank_group_id") REFERENCES "public"."rank_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_migrations" ADD CONSTRAINT "employee_migrations_rank_id_ranks_id_fk" FOREIGN KEY ("rank_id") REFERENCES "public"."ranks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_migrations" ADD CONSTRAINT "employee_migrations_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_migrations" ADD CONSTRAINT "employee_migrations_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_migrations" ADD CONSTRAINT "employee_migrations_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_migrations" ADD CONSTRAINT "employee_migrations_edited_by_users_id_fk" FOREIGN KEY ("edited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee_migrations" ADD CONSTRAINT "employee_migrations_removed_by_users_id_fk" FOREIGN KEY ("removed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_district_id_districts_id_fk" FOREIGN KEY ("district_id") REFERENCES "public"."districts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_rank_group_id_rank_groups_id_fk" FOREIGN KEY ("rank_group_id") REFERENCES "public"."rank_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_rank_id_ranks_id_fk" FOREIGN KEY ("rank_id") REFERENCES "public"."ranks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_edited_by_users_id_fk" FOREIGN KEY ("edited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employees" ADD CONSTRAINT "employees_removed_by_users_id_fk" FOREIGN KEY ("removed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rank_groups" ADD CONSTRAINT "rank_groups_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rank_groups" ADD CONSTRAINT "rank_groups_edited_by_users_id_fk" FOREIGN KEY ("edited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rank_groups" ADD CONSTRAINT "rank_groups_removed_by_users_id_fk" FOREIGN KEY ("removed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ranks" ADD CONSTRAINT "ranks_rank_group_id_rank_groups_id_fk" FOREIGN KEY ("rank_group_id") REFERENCES "public"."rank_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ranks" ADD CONSTRAINT "ranks_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ranks" ADD CONSTRAINT "ranks_edited_by_users_id_fk" FOREIGN KEY ("edited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ranks" ADD CONSTRAINT "ranks_removed_by_users_id_fk" FOREIGN KEY ("removed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roles" ADD CONSTRAINT "roles_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roles" ADD CONSTRAINT "roles_edited_by_users_id_fk" FOREIGN KEY ("edited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "roles" ADD CONSTRAINT "roles_removed_by_users_id_fk" FOREIGN KEY ("removed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_added_by_users_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_edited_by_users_id_fk" FOREIGN KEY ("edited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_removed_by_users_id_fk" FOREIGN KEY ("removed_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

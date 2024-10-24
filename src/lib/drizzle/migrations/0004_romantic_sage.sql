ALTER TABLE "countries" ADD COLUMN "restored_at" timestamp;--> statement-breakpoint
ALTER TABLE "countries" ADD COLUMN "restored_by" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "countries" ADD CONSTRAINT "countries_restored_by_users_id_fk" FOREIGN KEY ("restored_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

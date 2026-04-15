-- This file should undo anything in `up.sql`
-- Remove the Foreign Key constraint first
ALTER TABLE "website" DROP CONSTRAINT "Website_user_id_fkey";

-- Drop the "user" table
DROP TABLE "user";

-- Remove the "created_at" column from "website_tick"
ALTER TABLE "website_tick" DROP COLUMN "created_at";

-- Revert "website" table changes:
-- 1. Remove the "user_id" column
-- 2. Remove the default value from "time_added"
ALTER TABLE "website"
  DROP COLUMN "user_id",
  ALTER COLUMN "time_added" DROP DEFAULT;

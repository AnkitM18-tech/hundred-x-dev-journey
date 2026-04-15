-- Your SQL goes here
-- AlterTable
ALTER TABLE "website" ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "time_added" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "website_tick" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "website" ADD CONSTRAINT "Website_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

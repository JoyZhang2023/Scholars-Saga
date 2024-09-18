/*
  Warnings:

  - You are about to drop the column `class_number` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `section_time` on the `classes` table. All the data in the column will be lost.
  - You are about to alter the column `class_section` on the `classes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(5)`.
  - A unique constraint covering the columns `[email]` on the table `counselors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `students` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class_category` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_end_time` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_name` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_start_time` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Made the column `class_section` on table `classes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `professor` on table `classes` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password` to the `counselors` table without a default value. This is not possible if the table is not empty.
  - Made the column `first_name` on table `counselors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `counselors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `counselors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_type` on table `counselors` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password` to the `students` table without a default value. This is not possible if the table is not empty.
  - Made the column `first_name` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_type` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enrollment_date` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `degree_path` on table `students` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "class_day_enum" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday');

-- CreateEnum
CREATE TYPE "terms_offered_enum" AS ENUM ('Winter', 'Spring', 'Summer', 'Fall');

-- AlterTable
CREATE SEQUENCE classes_id_seq;
ALTER TABLE "classes" DROP COLUMN "class_number",
DROP COLUMN "section_time",
ADD COLUMN     "class_category" VARCHAR(50) NOT NULL,
ADD COLUMN     "class_day" "class_day_enum"[],
ADD COLUMN     "class_end_time" TIME(6) NOT NULL,
ADD COLUMN     "class_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "class_start_time" TIME(6) NOT NULL,
ADD COLUMN     "current_enrollments" INTEGER,
ADD COLUMN     "fulfill_major_requirements" TEXT[],
ADD COLUMN     "terms_offered" "terms_offered_enum"[],
ALTER COLUMN "id" SET DEFAULT nextval('classes_id_seq'),
ALTER COLUMN "class_section" SET NOT NULL,
ALTER COLUMN "class_section" SET DATA TYPE VARCHAR(5),
ALTER COLUMN "professor" SET NOT NULL;
ALTER SEQUENCE classes_id_seq OWNED BY "classes"."id";

-- AlterTable
CREATE SEQUENCE counselors_id_seq;
ALTER TABLE "counselors" ADD COLUMN     "password" VARCHAR(255) NOT NULL,
ADD COLUMN     "profile_picture" VARCHAR(255),
ALTER COLUMN "id" SET DEFAULT nextval('counselors_id_seq'),
ALTER COLUMN "first_name" SET NOT NULL,
ALTER COLUMN "last_name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "user_type" SET NOT NULL,
ALTER COLUMN "user_type" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "office_location" SET DATA TYPE VARCHAR(255);
ALTER SEQUENCE counselors_id_seq OWNED BY "counselors"."id";

-- AlterTable
CREATE SEQUENCE students_id_seq;
ALTER TABLE "students" ADD COLUMN     "password" VARCHAR(255) NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('students_id_seq'),
ALTER COLUMN "first_name" SET NOT NULL,
ALTER COLUMN "first_name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "last_name" SET NOT NULL,
ALTER COLUMN "last_name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "user_type" SET NOT NULL,
ALTER COLUMN "user_type" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "enrollment_date" SET NOT NULL,
ALTER COLUMN "degree_path" SET NOT NULL;
ALTER SEQUENCE students_id_seq OWNED BY "students"."id";

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "selectedDate" TIMESTAMP(3) NOT NULL,
    "selectedTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollment" (
    "id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,
    "registered_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "theme_settings" (
    "id" INTEGER NOT NULL,
    "primary_color" VARCHAR(7),
    "secondary_color" VARCHAR(7),
    "text_primary" VARCHAR(7),
    "text_secondary" VARCHAR(7),
    "background_default" VARCHAR(7)
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" VARCHAR(1),
    "profile_id" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_email" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "counselors_email_key" ON "counselors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

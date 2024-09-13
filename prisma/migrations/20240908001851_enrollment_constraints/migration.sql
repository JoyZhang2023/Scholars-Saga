/*
  Warnings:

  - You are about to drop the column `class_number` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `section_time` on the `classes` table. All the data in the column will be lost.
  - You are about to alter the column `class_section` on the `classes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(5)`.
  - Added the required column `class_category` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_end_time` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_name` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `class_start_time` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Made the column `class_section` on table `classes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `professor` on table `classes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `first_name` on table `counselors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `counselors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `counselors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_type` on table `counselors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `counselors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `first_name` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `last_name` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_type` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `enrollment_date` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `degree_path` on table `students` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `students` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "class_day_enum" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday');

-- CreateEnum
CREATE TYPE "role_enum" AS ENUM ('Admin', 'Counselor', 'Student');

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
ADD COLUMN     "credits" SMALLINT,
ADD COLUMN     "current_enrollments" INTEGER,
ADD COLUMN     "description" VARCHAR NOT NULL,
ADD COLUMN     "fulfill_major_requirements" TEXT[],
ADD COLUMN     "terms_offered" "terms_offered_enum"[],
ALTER COLUMN "id" SET DEFAULT nextval('classes_id_seq'),
ALTER COLUMN "class_section" SET NOT NULL,
ALTER COLUMN "class_section" SET DATA TYPE VARCHAR(5),
ALTER COLUMN "professor" SET NOT NULL;
ALTER SEQUENCE classes_id_seq OWNED BY "classes"."id";

-- AlterTable
CREATE SEQUENCE counselors_id_seq;
ALTER TABLE "counselors" ADD COLUMN     "profile_picture" VARCHAR(255),
ALTER COLUMN "id" SET DEFAULT nextval('counselors_id_seq'),
ALTER COLUMN "first_name" SET NOT NULL,
ALTER COLUMN "last_name" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "user_type" SET NOT NULL,
ALTER COLUMN "user_type" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "office_location" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET NOT NULL;
ALTER SEQUENCE counselors_id_seq OWNED BY "counselors"."id";

-- AlterTable
CREATE SEQUENCE students_id_seq;
ALTER TABLE "students" ALTER COLUMN "id" SET DEFAULT nextval('students_id_seq'),
ALTER COLUMN "first_name" SET NOT NULL,
ALTER COLUMN "first_name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "last_name" SET NOT NULL,
ALTER COLUMN "last_name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "user_type" SET NOT NULL,
ALTER COLUMN "user_type" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "enrollment_date" SET NOT NULL,
ALTER COLUMN "degree_path" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;
ALTER SEQUENCE students_id_seq OWNED BY "students"."id";

-- CreateTable
CREATE TABLE "theme_settings" (
    "id" INTEGER NOT NULL,
    "primary_color" VARCHAR(7),
    "secondary_color" VARCHAR(7),
    "text_primary" VARCHAR(7),
    "text_secondary" VARCHAR(7),
    "background_default" VARCHAR(7),

    CONSTRAINT "theme_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" "role_enum",
    "profile_id" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "edu_plan" (
    "id" SERIAL NOT NULL,
    "year" VARCHAR,
    "courses" VARCHAR,
    "created_at" TIMESTAMP(6),
    "student_id" INTEGER,

    CONSTRAINT "edu_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edu_plan_courses" (
    "id" SERIAL NOT NULL,
    "edu_plan_id" INTEGER,
    "class_id" INTEGER,
    "term" VARCHAR,

    CONSTRAINT "edu_plan_courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollment" (
    "student_id" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,
    "enrolled_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "enrollment_pkey" PRIMARY KEY ("student_id","class_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_email" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_student_id_class_id_key" ON "enrollment"("student_id", "class_id");

-- CreateIndex
CREATE INDEX "classes_class_name_class_section_idx" ON "classes"("class_name", "class_section");

-- CreateIndex
CREATE INDEX "students_email_idx" ON "students"("email");

-- AddForeignKey
ALTER TABLE "edu_plan" ADD CONSTRAINT "student_id_relation" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edu_plan_courses" ADD CONSTRAINT "class_id_relation" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "edu_plan_courses" ADD CONSTRAINT "edu_plan_relation" FOREIGN KEY ("edu_plan_id") REFERENCES "edu_plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment" ADD CONSTRAINT "enrollment_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

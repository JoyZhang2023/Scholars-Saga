/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `counselors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `students` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "counselors_email_key" ON "counselors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- CreateTable
CREATE TABLE "classes" (
    "id" INTEGER NOT NULL,
    "class_section" VARCHAR(100),
    "class_number" INTEGER,
    "section_time" TIME(6),
    "professor" VARCHAR(100),
    "class_size" INTEGER,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "counselors" (
    "id" INTEGER NOT NULL,
    "first_name" VARCHAR(100),
    "last_name" VARCHAR(100),
    "email" VARCHAR(100),
    "user_type" VARCHAR(25),
    "department" VARCHAR(100),
    "office_location" VARCHAR(100),

    CONSTRAINT "counselors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" INTEGER NOT NULL,
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "email" VARCHAR(100),
    "user_type" VARCHAR(25),
    "enrollment_date" DATE,
    "degree_path" VARCHAR(100),
    "profile_picture" VARCHAR(255),

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

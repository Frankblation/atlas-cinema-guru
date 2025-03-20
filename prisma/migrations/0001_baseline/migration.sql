-- CreateTable
CREATE TABLE "activities" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "timestamp" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "title_id" UUID NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "activity" VARCHAR(255) NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "title_id" UUID NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "titles" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "title" VARCHAR(255) NOT NULL,
    "synopsis" VARCHAR(255) NOT NULL,
    "released" INTEGER NOT NULL,
    "genre" VARCHAR(255) NOT NULL,

    CONSTRAINT "titles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watchlater" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "title_id" UUID NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "watchlater_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "titles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "titles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "watchlater" ADD CONSTRAINT "watchlater_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "titles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;


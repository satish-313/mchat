-- CreateTable
CREATE TABLE "messagetable" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "room" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "createtime" VARCHAR(255) NOT NULL,

    CONSTRAINT "messagetable_pkey" PRIMARY KEY ("id")
);

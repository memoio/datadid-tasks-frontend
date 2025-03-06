-- CreateTable
CREATE TABLE "OAT" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false
);

/*
  Warnings:

  - A unique constraint covering the columns `[address,projectId]` on the table `OAT` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OAT_address_projectId_key" ON "OAT"("address", "projectId");

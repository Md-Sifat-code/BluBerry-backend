/*
  Warnings:

  - You are about to drop the column `name` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `pickupAddress` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `address` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consent` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "name",
DROP COLUMN "pickupAddress",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "consent" BOOLEAN NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;

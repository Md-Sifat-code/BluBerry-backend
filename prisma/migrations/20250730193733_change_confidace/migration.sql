/*
  Warnings:

  - Changed the type of `condition` on the `Item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "condition",
ADD COLUMN     "condition" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Condition";

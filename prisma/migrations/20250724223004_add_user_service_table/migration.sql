-- CreateTable
CREATE TABLE "UserService" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "estimatedValue" TEXT NOT NULL,
    "timeFrame" TEXT NOT NULL,
    "additionalInfo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "accountId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Membership_accountId_teamId_key" ON "Membership"("accountId", "teamId");

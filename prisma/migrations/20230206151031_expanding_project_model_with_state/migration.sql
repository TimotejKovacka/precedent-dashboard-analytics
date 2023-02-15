-- CreateEnum
CREATE TYPE "ProjectState" AS ENUM ('WAITING', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "state" "ProjectState" NOT NULL DEFAULT 'WAITING';

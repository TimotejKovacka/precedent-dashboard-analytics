/*
  Warnings:

  - You are about to drop the column `state` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "state",
ADD COLUMN     "project_state" "ProjectState" NOT NULL DEFAULT 'WAITING';

/*
  Warnings:

  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Coment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `author` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Coment" DROP CONSTRAINT "Coment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorId",
ADD COLUMN     "author" TEXT NOT NULL;

-- DropTable
DROP TABLE "Coment";

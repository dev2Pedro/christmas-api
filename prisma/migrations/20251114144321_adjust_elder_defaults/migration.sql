/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Elder` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Elder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL DEFAULT 0,
    "likes" TEXT NOT NULL DEFAULT '',
    "wish" TEXT NOT NULL DEFAULT '',
    "adopted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Elder" ("age", "id", "likes", "name", "wish") SELECT "age", "id", "likes", "name", "wish" FROM "Elder";
DROP TABLE "Elder";
ALTER TABLE "new_Elder" RENAME TO "Elder";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - Added the required column `age` to the `Elder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Elder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wish` to the `Elder` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Elder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "likes" TEXT NOT NULL,
    "wish" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Elder" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "Elder";
DROP TABLE "Elder";
ALTER TABLE "new_Elder" RENAME TO "Elder";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

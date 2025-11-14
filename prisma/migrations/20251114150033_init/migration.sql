-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gift" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT,
    "elderName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Gift" ("createdAt", "elderName", "email", "id", "message", "name", "phone") SELECT "createdAt", "elderName", "email", "id", "message", "name", "phone" FROM "Gift";
DROP TABLE "Gift";
ALTER TABLE "new_Gift" RENAME TO "Gift";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Budget` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Budget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "max" REAL NOT NULL,
    "value" REAL NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Budget" ("category", "id", "max", "userId", "value") SELECT "category", "id", "max", "userId", "value" FROM "Budget";
DROP TABLE "Budget";
ALTER TABLE "new_Budget" RENAME TO "Budget";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

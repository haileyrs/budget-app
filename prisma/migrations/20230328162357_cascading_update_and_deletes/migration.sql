-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Budget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "max" REAL NOT NULL,
    "value" REAL NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Budget_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Budget" ("categoryId", "id", "max", "month", "userId", "value", "year") SELECT "categoryId", "id", "max", "month", "userId", "value", "year" FROM "Budget";
DROP TABLE "Budget";
ALTER TABLE "new_Budget" RENAME TO "Budget";
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vendor" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "date" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "moneyAccountId" INTEGER NOT NULL,
    CONSTRAINT "Transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Transaction_moneyAccountId_fkey" FOREIGN KEY ("moneyAccountId") REFERENCES "MoneyAccount" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "categoryId", "date", "id", "moneyAccountId", "vendor") SELECT "amount", "categoryId", "date", "id", "moneyAccountId", "vendor" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE TABLE "new_RecurringBudget" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "max" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "RecurringBudget_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RecurringBudget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RecurringBudget" ("categoryId", "id", "max", "userId") SELECT "categoryId", "id", "max", "userId" FROM "RecurringBudget";
DROP TABLE "RecurringBudget";
ALTER TABLE "new_RecurringBudget" RENAME TO "RecurringBudget";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

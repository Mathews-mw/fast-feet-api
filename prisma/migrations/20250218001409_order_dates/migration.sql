-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "withdrawal_at" DROP NOT NULL,
ALTER COLUMN "delivery_at" DROP NOT NULL,
ALTER COLUMN "status_updated_at" DROP NOT NULL;

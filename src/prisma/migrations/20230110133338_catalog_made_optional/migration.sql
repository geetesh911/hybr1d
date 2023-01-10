-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_catalogId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "catalogId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "order_status" AS ENUM ('pending', 'confirmed', 'shiping', 'delivered', 'cancelled');

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "user_name" VARCHAR(100) NOT NULL,
    "user_email" VARCHAR(150) NOT NULL,
    "user_phone" VARCHAR(15) NOT NULL,
    "address" TEXT NOT NULL,
    "province_code" VARCHAR(20),
    "ward_code" VARCHAR(20),
    "delivery_date" TIMESTAMPTZ(6),
    "note" TEXT,
    "total_amount" DECIMAL(15,2) NOT NULL,
    "status" "order_status" DEFAULT 'pending',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "price" DECIMAL(15,2) NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "description" TEXT,
    "brand" VARCHAR(100),
    "stock" INTEGER NOT NULL DEFAULT 0,
    "rating" DECIMAL(3,2) DEFAULT 0,
    "rating_count" INTEGER DEFAULT 0,
    "categoryId" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

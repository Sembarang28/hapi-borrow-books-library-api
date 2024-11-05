-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "job" VARCHAR(100) NOT NULL,
    "birthDate" DATE NOT NULL,
    "birthPlace" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "writers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "birthDate" DATE NOT NULL,
    "birthPlace" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "writers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publishers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" DATE NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "publishers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "publisherId" INTEGER NOT NULL,
    "writerId" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "year" VARCHAR(4) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "borrowed_books" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "borrowId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "borrowed_books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "borrow" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "status" VARCHAR(100) NOT NULL,
    "borrowDate" DATE NOT NULL,
    "returnDate" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "borrow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "publishers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "writers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrowed_books" ADD CONSTRAINT "borrowed_books_borrowId_fkey" FOREIGN KEY ("borrowId") REFERENCES "borrow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrowed_books" ADD CONSTRAINT "borrowed_books_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrow" ADD CONSTRAINT "borrow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_publisherId_fkey";

-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_writerId_fkey";

-- DropForeignKey
ALTER TABLE "borrow" DROP CONSTRAINT "borrow_userId_fkey";

-- DropForeignKey
ALTER TABLE "borrowed_books" DROP CONSTRAINT "borrowed_books_bookId_fkey";

-- DropForeignKey
ALTER TABLE "borrowed_books" DROP CONSTRAINT "borrowed_books_borrowId_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_userId_fkey";

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "publishers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "writers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrowed_books" ADD CONSTRAINT "borrowed_books_borrowId_fkey" FOREIGN KEY ("borrowId") REFERENCES "borrow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrowed_books" ADD CONSTRAINT "borrowed_books_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrow" ADD CONSTRAINT "borrow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

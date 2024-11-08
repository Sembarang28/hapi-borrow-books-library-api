import prisma from "../config/databaseConnection";
import IBorrowedBooks from "../interfaces/borrowedBooks";

class BorrowedBooksModel {
  static async createBorrowedBooks(data: IBorrowedBooks) {
    return await prisma.borrowedBooks.create({
      data: {
        borrowId: data.borrowId,
        bookId: data.bookId,
      }
    });
  }

  static async readBorrowedBooksById(id: string) {
    return await prisma.borrowedBooks.findUnique({
      where: {
        id,
      }
    })
  }

  static async updateBorrowedBooksById(id: string, data: IBorrowedBooks) {
    return await prisma.borrowedBooks.update({
      where: {
        id,
      },
      data: {
        borrowId: data.borrowId,
        bookId: data.bookId,
      }
    });
  }

  static async deleteBorrowedBooksById(id: string) {
    return await prisma.borrowedBooks.delete({
      where: {
        id,
      },
    });
  }
}

export default BorrowedBooksModel;
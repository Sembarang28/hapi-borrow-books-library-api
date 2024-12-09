import IBorrow from "../../../interfaces/borrow";
import IBorrowedBooks from "../../../interfaces/borrowedBooks";
import borrowModel from "../../../models/borrow";
import borrowedBooksModel from "../../../models/borrowedBooks";

class UserBorrowService {
  async createBorrowService(userId: string, books: string[]) {
    try {
      const currentDate = new Date();
      const returnDate = new Date(currentDate);
      returnDate.setDate(currentDate.getDate() + 7);
      const data: IBorrow = {
        userId,
        status: "borrow",
        borrowDate: currentDate.toISOString(),
        returnDate: returnDate.toISOString(),
      }
      const createBorrow = await borrowModel.createBorrow(data);

      const borrowedBooks: IBorrowedBooks[] = books.map((book) => ({
        borrowId: createBorrow.id,
        bookId: book,
      }));

      await borrowedBooksModel.createManyBorrowedBooks(borrowedBooks);

      return {
        body: {
          status: true,
          message: 'Data berhasil ditambah',
        },
        code: 201,
      };
    } catch (error) {
      console.log('create borrow service error: ', error);
      return {
        body: {
          status: false,
          message: 'create borrow service error'
        },
        code: 500,
      };
    }
  }

  async readAllBorrowByUserIdService(userId: string, status: string) {
    try {
      const readAllBorrowByUserId = await borrowModel.readAllBorrowByUserId(userId, status);

      if (!readAllBorrowByUserId[0]) {
        return {
          body: {
            status: false,
            message: 'Data tidak berhasil ditemukan!',
          },
          code: 404,
        };
      }

      const data = [];

      for (const borrow of readAllBorrowByUserId) {
        const books = [];
        for (const book of borrow.borrowedBooks) {
          const bookObject = {
            id: book.books.id,
            title: book.books.title,
            year: book.books.year,
            writerName: book.books.writers.name,
            publisherName: book.books.publisher.name,
            publisherCity: book.books.publisher.city
          }

          books.push(bookObject);
        }

        const borrowObject = {
          id: borrow.id,
          name: borrow.user.profile?.name,
          address: borrow.user.profile?.address,
          status: borrow.status,
          borrowDate: borrow.borrowDate,
          returnDate: borrow.returnDate,
          books,
        }

        data.push(borrowObject);
      }

      return {
        body: {
          status: true,
          message: 'Data berhasil ditemukan',
          data,
        },
        code: 200,
      };
    } catch (error) {
      console.log('read all borrow service error: ', error);
      return {
        body: {
          status: false,
          message: 'read all borrow service error'
        },
        code: 500,
      };
    }
  }

  async readBorrowByIdService(id: string) {
    try {
      const readBorrowById = await borrowModel.readBorrowById(id);

      if (!readBorrowById) {
        return {
          body: {
            status: false,
            message: 'Data tidak berhasil ditemukan!',
          },
          code: 404,
        };
      }

      const books = [];

      for (const book of readBorrowById.borrowedBooks) {
        const bookObject = {
          id: book.books.id,
          title: book.books.title,
          year: book.books.year,
          writerName: book.books.writers.name,
          publisherName: book.books.publisher.name,
          publisherCity: book.books.publisher.city
        }

        books.push(bookObject);
      }

      const data = {
        id: readBorrowById.id,
        name: readBorrowById.user.profile?.name,
        address: readBorrowById.user.profile?.address,
        status: readBorrowById.status,
        borrowDate: readBorrowById.borrowDate,
        returnDate: readBorrowById.returnDate,
        books,
      }

      return {
        body: {
          status: true,
          message: 'Data berhasil ditemukan',
          data,
        },
        code: 200,
      };
    } catch (error) {
      console.log('read borrow service error: ', error);
      return {
        body: {
          status: false,
          message: 'read borrow service error'
        },
        code: 500,
      };
    }
  }
}

export default new UserBorrowService();
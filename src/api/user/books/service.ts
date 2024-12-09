import bookModel from "../../../models/book";

class UserBookService {
  async readAllBookService(title: string, year: string, publisherName: string, writerName: string) {
    try {
      const readAllBook = await bookModel.readAllBook(title, year, publisherName, writerName);

      if (!readAllBook[0]) {
        return {
          body: {
            status: false,
            message: 'Data tidak berhasil ditemukan!',
          },
          code: 404,
        };
      }

      const data = readAllBook.map((book) => ({
        id: book.id,
        title: book.title,
        year: book.year,
        writerName: book.writers.name,
        publisherName: book.publisher.name,
        publisherCity: book.publisher.city
      }));

      return {
        body: {
          status: true,
          message: 'Data berhasil ditemukan',
          data,
        },
        code: 200,
      };
    } catch (error) {
      console.log('read all book service error: ', error);
      return {
        body: {
          status: false,
          message: 'read all book service error'
        },
        code: 500,
      };
    }
  }

  async readBookByIdService(id: string) {
    try {
      const readBookById = await bookModel.readBookById(id);

      if (!readBookById) {
        return {
          body: {
            status: false,
            message: 'Data tidak berhasil ditemukan!',
          },
          code: 404,
        };
      }

      const data = {
        id: readBookById.id,
        title: readBookById.title,
        year: readBookById.year,
        writerName: readBookById.writers.name,
        publisherName: readBookById.publisher.name,
        publisherCity: readBookById.publisher.city
      }

      return {
        body: {
          status: true,
          message: 'Data berhasil ditemukan',
          data,
        },
        code: 200,
      }
    } catch (error) {
      console.log('read book service error: ', error);
      return {
        body: {
          status: false,
          message: 'read book service error'
        },
        code: 500,
      };
    }
  }
}

export default new UserBookService();
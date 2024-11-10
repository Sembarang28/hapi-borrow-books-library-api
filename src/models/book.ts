import prisma from "../config/databaseConnection";
import IBook from "../interfaces/book";

class BookModel {
  static async createBook(data: IBook) {
    return await prisma.books.create({
      data: {
        publisherId: data.publisherId,
        writerId: data.writerId,
        title: data.title,
        year: data.year,
      }
    });
  }

  static async readAllBook(title: string, year: string, publisherName: string, writerName: string) {
    return await prisma.books.findMany({
      where: {
        title: { contains: title, mode: 'insensitive' },
        year,
        publisher: { name: { contains: publisherName, mode: 'insensitive' } },
        writers: { name: { contains: writerName, mode: 'insensitive' } },
      },
      select: {
        id: true,
        writers: {
          select: {
            name: true,
          }
        },
        publisher: {
          select: {
            name: true,
            city: true,
          }
        },
        title: true,
        year: true,
      },
    });
  }

  static async readBookById(id: string) {
    return await prisma.books.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        writers: {
          select: {
            name: true,
          }
        },
        publisher: {
          select: {
            name: true,
            city: true,
          }
        },
        title: true,
        year: true,
      },
    });
  }

  static async updateBookById(id: string, data: IBook) {
    return await prisma.books.update({
      where: {
        id,
      },
      data: {
        publisherId: data.publisherId,
        writerId: data.writerId,
        title: data.title,
        year: data.year,
      },
    });
  }

  static async deleteBookById(id: string) {
    return await prisma.books.delete({
      where: {
        id,
      },
    });
  }
}

export default BookModel;
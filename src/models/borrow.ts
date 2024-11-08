import prisma from "../config/databaseConnection";
import IBorrow from "../interfaces/borrow";
import IBorrowedBooks from "../interfaces/borrowedBooks";

class BorrowModel {
  static async createBorrow(data: IBorrow, borrowBook: IBorrowedBooks[]) {
    return await prisma.borrow.create({
      data: {
        userId: data.userId,
        status: data.status,
        borrowDate: data.borrowDate,
        returnDate: data.returnDate,
        borrowedBooks: {
          createMany: {
            data: borrowBook,
          }
        }
      }
    })
  }

  static async readAllBorrow(name: string, status: string) {
    return await prisma.borrow.findMany({
      where: {
        status,
        user: { profile: { name: { contains: name, mode: 'insensitive' } } },
      },
      select: {
        user: {
          select: {
            profile: {
              select: {
                name: true,
                address: true,
              },
            },
          },
        },
        status: true,
        borrowDate: true,
        returnDate: true,
        borrowedBooks: true,
      }
    })
  }

  static async readBorrowById(id: string) {
    return await prisma.borrow.findUnique({
      where: {
        id,
      },
      select: {
        user: {
          select: {
            profile: {
              select: {
                name: true,
                address: true,
              },
            },
          },
        },
        status: true,
        borrowDate: true,
        returnDate: true,
        borrowedBooks: true,
      }
    });
  }

  static async updateBorrowById(id: string, data: IBorrow) {
    return await prisma.borrow.update({
      where: {
        id,
      },
      data: {
        userId: data.userId,
        status: data.status,
        borrowDate: data.borrowDate,
        returnDate: data.returnDate,
      }
    })
  }

  static async deleteBorrowById(id: string) {
    return await prisma.borrow.delete({
      where: {
        id,
      },
    });
  }
}

export default BorrowModel;
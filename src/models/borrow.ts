import prisma from "../config/databaseConnection";
import IBorrow from "../interfaces/borrow";

class BorrowModel {
  static async createBorrow(data: IBorrow) {
    return await prisma.borrow.create({
      data: {
        userId: data.userId,
        status: data.status,
        borrowDate: new Date(data.borrowDate),
        returnDate: new Date(data.returnDate),
      },
    });
  }

  static async readAllBorrow(name: string, status: string) {
    return await prisma.borrow.findMany({
      where: {
        status,
        user: { profile: { name: { contains: name, mode: 'insensitive' } } },
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
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
        borrowedBooks: {
          select: {
            books: {
              select: {
                id: true,
                title: true,
                year: true,
                writers: {
                  select: {
                    name: true,
                  },
                },
                publisher: {
                  select: {
                    name: true,
                    city: true,
                  },
                },
              },
            },
          },
        },
      }
    })
  }

  static async readAllBorrowByUserId(userId: string, status: string) {
    return await prisma.borrow.findMany({
      where: {
        status,
        userId,
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
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
        borrowedBooks: {
          select: {
            books: {
              select: {
                id: true,
                title: true,
                year: true,
                writers: {
                  select: {
                    name: true,
                  },
                },
                publisher: {
                  select: {
                    name: true,
                    city: true,
                  },
                },
              },
            },
          },
        },
      }
    })
  }

  static async readBorrowById(id: string) {
    return await prisma.borrow.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
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
        borrowedBooks: {
          select: {
            books: {
              select: {
                id: true,
                title: true,
                year: true,
                writers: {
                  select: {
                    name: true,
                  },
                },
                publisher: {
                  select: {
                    name: true,
                    city: true,
                  },
                },
              },
            },
          },
        },
      }
    });
  }

  static async updateBorrowById(id: string, status: string) {
    return await prisma.borrow.update({
      where: {
        id,
      },
      data: {
        status,
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
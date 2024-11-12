import IBorrowedBooks from "../../../interfaces/borrowedBooks";
import borrowedBooksModel from "../../../models/borrowedBooks";

class BorrowedBooksService {
  async createBorrowedBooks(data: IBorrowedBooks) {
    try {
      await borrowedBooksModel.createBorrowedBooks(data);

      return {
        body: {
          status: true,
          message: 'Data berhasil ditambah',
        },
        code: 201,
      };
    } catch (error) {
      console.log('create borrow book service error: ', error);
      return {
        body: {
          status: false,
          message: 'create borrow book service error'
        },
        code: 500,
      };
    }
  }

  async readBorrowedBooksById(id: string) {
    try {
      const readBorrowedBooksById = await borrowedBooksModel.readBorrowedBooksById(id);

      if (!readBorrowedBooksById) {
        return {
          body: {
            status: false,
            message: 'Data tidak berhasil ditemukan!',
          },
          code: 404,
        };
      }

      return {
        body: {
          status: true,
          message: 'Data berhasil ditemukan',
          data: readBorrowedBooksById,
        },
        code: 200,
      };
    } catch (error) {
      console.log('read borrow book service error: ', error);
      return {
        body: {
          status: false,
          message: 'read borrow book service error'
        },
        code: 500,
      };
    }
  }

  async updateBorrowedByIdBooks(id: string, data: IBorrowedBooks) {
    try {
      await borrowedBooksModel.updateBorrowedBooksById(id, data);

      return {
        body: {
          status: true,
          message: 'Data berhasil diubah',
        },
        code: 200,
      };
    } catch (error) {
      console.log('update borrow book service error: ', error);
      return {
        body: {
          status: false,
          message: 'update borrow book service error'
        },
        code: 500,
      };
    }
  }

  async deleteBorrowedByIdBooks(id: string) {
    try {
      await borrowedBooksModel.deleteBorrowedBooksById(id);

      return {
        body: {
          status: true,
          message: 'Data berhasil dihapus',
        },
        code: 200,
      };
    } catch (error) {
      console.log('delete borrow book service error: ', error);
      return {
        body: {
          status: false,
          message: 'delete borrow book service error'
        },
        code: 500,
      };
    }
  }
}

export default new BorrowedBooksService();
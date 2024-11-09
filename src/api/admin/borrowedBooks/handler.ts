import Hapi from '@hapi/hapi';
import response from '../../../helpers/response';
import borrowBookService from './service';
import IBorrowedBooks from '../../../interfaces/borrowedBooks';

class BorrowBookHandler {
  async createBorrowBookHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const createBorrowBook = await borrowBookService.createBorrowedBooks(request.payload as IBorrowedBooks)

      return response(h, createBorrowBook.code, createBorrowBook.body);
    } catch (error) {
      console.log('create borrow book handler error: ', error);
      const resBody = {
        status: false,
        message: 'create borrow book handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async readBorrowBookByIdHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const { id } = request.params as { id: string };

      const readBorroBookById = await borrowBookService.readBorrowedBooksById(id);

      return response(h, readBorroBookById.code, readBorroBookById.body);
    } catch (error) {
      console.log('read borrow book handler error: ', error);
      const resBody = {
        status: false,
        message: 'read borrow book handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async updateBorrowBookByIdHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const { id } = request.params as { id: string };

      const updateBorrowBookById = await borrowBookService.updateBorrowedByIdBooks(id, request.payload as IBorrowedBooks);

      return response(h, updateBorrowBookById.code, updateBorrowBookById.body);
    } catch (error) {
      console.log('update borrow book handler error: ', error);
      const resBody = {
        status: false,
        message: 'update borrow book handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async deleteBorrowBookByIdHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const { id } = request.params as { id: string };

      const deleteBorrowBookById = await borrowBookService.deleteBorrowedByIdBooks(id);

      return response(h, deleteBorrowBookById.code, deleteBorrowBookById.body);
    } catch (error) {
      console.log('delete borrow book handler error: ', error);
      const resBody = {
        status: false,
        message: 'delete borrow book handler error',
      }

      return response(h, 500, resBody);
    }
  }
}

export default new BorrowBookHandler();
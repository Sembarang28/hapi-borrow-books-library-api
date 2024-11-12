import Hapi from '@hapi/hapi';
import response from '../../../helpers/response';
import borrowService from './service';
import IBorrow from '../../../interfaces/borrow';

class BorrowHandler {
  async createBorrowHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const {
        userId,
        books,
      } = request.payload as {
        userId: string,
        books: string[],
      }

      const creatBorrow = await borrowService.createBorrowService(userId, books);

      return response(h, creatBorrow.code, creatBorrow.body);
    } catch (error) {
      console.log('create borrow handler error: ', error);
      const resBody = {
        status: false,
        message: 'create borrow handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async readAllBorrowHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const { name } = request.query as { name: string } || "";
      const { status } = request.query as { status: string } || "";

      const readAllBorrow = await borrowService.readAllBorrowService(name, status);

      return response(h, readAllBorrow.code, readAllBorrow.body);
    } catch (error) {
      console.log('read all borrow handler error: ', error);
      const resBody = {
        status: false,
        message: 'read all borrow handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async readBorrowByIdHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
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

      const readBorrowById = await borrowService.readBorrowByIdService(id);

      return response(h, readBorrowById.code, readBorrowById.body);
    } catch (error) {
      console.log('read borrow handler error: ', error);
      const resBody = {
        status: false,
        message: 'read borrow handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async updateBorrowByIdHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
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

      const { status } = request.payload as { status: string };

      const updateBorrowById = await borrowService.updateBorrowService(id, status);

      return response(h, updateBorrowById.code, updateBorrowById.body);
    } catch (error) {
      console.log('update borrow handler error: ', error);
      const resBody = {
        status: false,
        message: 'update borrow handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async deleteBorrowByIdHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
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

      const deleteBorrowById = await borrowService.deleteBorrowService(id);

      return response(h, deleteBorrowById.code, deleteBorrowById.body);
    } catch (error) {
      console.log('delete borrow handler error: ', error);
      const resBody = {
        status: false,
        message: 'delete borrow handler error',
      }

      return response(h, 500, resBody);
    }
  }
}

export default new BorrowHandler();
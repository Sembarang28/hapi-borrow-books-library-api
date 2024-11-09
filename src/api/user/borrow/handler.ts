import Hapi from '@hapi/hapi';
import response from '../../../helpers/response';
import borrowService from './service';
import IBorrow from '../../../interfaces/borrow';

class UserBorrowHandler {
  async createBorrowHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { userId, role } = request.auth.credentials as { userId: string, role: string };

      if (role !== 'user') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const {
        status,
        borrowDate,
        returnDate,
        books,
      } = request.payload as {
        userId: string,
        status: string,
        borrowDate: string,
        returnDate: string,
        books: string[],
      }

      const borrow: IBorrow = {
        userId,
        status,
        borrowDate,
        returnDate,
      }

      const creatBorrow = await borrowService.createBorrowService(borrow, books);

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

  async readAllBorrowByUserIdHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { userId, role } = request.auth.credentials as { userId: string, role: string };

      if (role !== 'user') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const { status } = request.query as { status: string } || "";

      const readAllBorrowByUserId = await borrowService.readAllBorrowByUserIdService(userId, status);

      return response(h, readAllBorrowByUserId.code, readAllBorrowByUserId.body);
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

      if (role !== 'user') {
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
}

export default new UserBorrowHandler();
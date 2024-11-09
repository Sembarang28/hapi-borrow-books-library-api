import Hapi from '@hapi/hapi';
import response from '../../../helpers/response';
import borrowService from './service';

class UserBorrowHandler {
  async createBorrowHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {

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

      if (role !== 'user') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }


    } catch (error) {
      console.log('read all borrow handler error: ', error);
      const resBody = {
        status: false,
        message: 'read all borrow handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async readBorrowHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
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
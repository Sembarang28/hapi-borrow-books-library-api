import Hapi from '@hapi/hapi';
import response from '../../../helpers/response';
import userBookService from './service';

class UserBookHandler {
  async readAllBookHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { role: string };

      if (role !== 'user') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const { title } = request.query as { title: string } || "";
      const { year } = request.query as { year: string } || "";
      const { publisherName } = request.query as { publisherName: string } || "";
      const { writerName } = request.query as { writerName: string } || "";

      const readAllBook = await userBookService.readAllBookService(title, year, publisherName, writerName);

      return response(h, readAllBook.code, readAllBook.body);
    } catch (error) {
      console.log('read all user book handler error: ', error);
      const resBody = {
        status: false,
        message: 'read all user book handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async readBookByIdHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
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

      const readBookById = await userBookService.readBookByIdService(id);

      return response(h, readBookById.code, readBookById.body)
    } catch (error) {
      console.log('read all user book handler error: ', error);
      const resBody = {
        status: false,
        message: 'read all user book handler error',
      }

      return response(h, 500, resBody);
    }
  }
}

export default new UserBookHandler();
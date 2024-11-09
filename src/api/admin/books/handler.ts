import response from "../../../helpers/response";
import Hapi from '@hapi/hapi';
import bookService from './service';
import IBook from "../../../interfaces/book";

class BookHandler {
  async createBookHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const createBook = await bookService.createBookService(request.payload as IBook);

      return response(h, createBook.code, createBook.body);
    } catch (error) {
      console.log('create book handler error: ', error);
      const resBody = {
        status: false,
        message: 'create book handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async readAllBookHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { role: string };

      if (role !== 'admin') {
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

      const readAllBook = await bookService.readAllBookService(title, year, publisherName, writerName);

      return response(h, readAllBook.code, readAllBook.body);
    } catch (error) {
      console.log('read all book handler error: ', error);
      const resBody = {
        status: false,
        message: 'read all book handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async readBookByIdHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const { id } = request.params;

      const readBookById = await bookService.readBookByIdService(id);

      return response(h, readBookById.code, readBookById.body);
    } catch (error) {
      console.log('read book handler error: ', error);
      const resBody = {
        status: false,
        message: 'read book handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async updateBookHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const { id } = request.params;

      const updateBookById = await bookService.updateBookByIdService(id, request.payload as IBook);

      return response(h, updateBookById.code, updateBookById.body);
    } catch (error) {
      console.log('update book handler error: ', error);
      const resBody = {
        status: false,
        message: 'update book handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async deleteBookHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const { id } = request.params;

      const deleteBookById = await bookService.deleteBookByIdService(id);

      return response(h, deleteBookById.code, deleteBookById.body);
    } catch (error) {
      console.log('delete book handler error: ', error);
      const resBody = {
        status: false,
        message: 'delete book handler error',
      }

      return response(h, 500, resBody);
    }
  }
}

export default new BookHandler();
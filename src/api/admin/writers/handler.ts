import Hapi from '@hapi/hapi'
import response from '../../../helpers/response';
import writerService from './service';
import IWriter from '../../../interfaces/writer';

class WriterHandler {
  async createWriterHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { userId: string, role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const createWriter = await writerService.createWriter(request.payload as IWriter);

      return response(h, createWriter.code, createWriter.body);
    } catch (error) {
      console.log('create writer handler error: ', error);
      const resBody = {
        status: false,
        message: 'create writer handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async readAllWriterHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { userId: string, role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const { name } = request.query as { name: string } || "";

      const readAllWriter = await writerService.readAllWriter(name);

      return response(h, readAllWriter.code, readAllWriter.body);
    } catch (error) {
      console.log('read all writer handler error: ', error);
      const resBody = {
        status: false,
        message: 'read all writer handler error',
      }

      return response(h, 500, resBody);
    }
  }
  async readWriterByIdHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { userId: string, role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const { id } = request.params as { id: string };

      const readWriter = await writerService.readWriterById(Number(id));

      return response(h, readWriter.code, readWriter.body);
    } catch (error) {
      console.log('read writer by id handler error: ', error);
      const resBody = {
        status: false,
        message: 'read writer by id handler error',
      }

      return response(h, 500, resBody);
    }
  }
  async updateWriterHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { userId: string, role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const { id } = request.params as { id: string };

      const updateWriter = await writerService.updateWriter(Number(id), request.payload as IWriter);

      return response(h, updateWriter.code, updateWriter.body);
    } catch (error) {
      console.log('update writer handler error: ', error);
      const resBody = {
        status: false,
        message: 'update writer handler error',
      }

      return response(h, 500, resBody);
    }
  }
  async deleteWriterHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { userId: string, role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const { id } = request.params as { id: string };

      const deleteWriter = await writerService.deleteWriter(Number(id));

      return response(h, deleteWriter.code, deleteWriter.body);
    } catch (error) {
      console.log('delete writer handler error: ', error);
      const resBody = {
        status: false,
        message: 'delete writer handler error',
      }

      return response(h, 500, resBody);
    }
  }
}

export default new WriterHandler();
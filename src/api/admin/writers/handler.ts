import Hapi from '@hapi/hapi'
import response from '../../../helpers/response';
import writerService from './service';
import IWriter from '../../../interfaces/writer';

class WriterHandler {
  async createWriterHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
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
      const { name } = request.query as { name: string };

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
import Hapi from '@hapi/hapi';
import response from '../../../helpers/response';
import publisherService from './service';
import IPublisher from '../../../interfaces/publisher';

class PublisherHandler {
  async createPublisherHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { userId: string, role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const createPublisher = await publisherService.createPublisher(request.payload as IPublisher);

      return response(h, createPublisher.code, createPublisher.body);
    } catch (error) {
      console.log('create publisher handler error: ', error);
      const resBody = {
        status: false,
        message: 'create publisher handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async readAllPublisherHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
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
      const { address } = request.query as { address: string } || "";
      const { city } = request.query as { city: string } || "";

      const readAllPublisher = await publisherService.readAllPublisher(name, address, city)

      return response(h, readAllPublisher.code, readAllPublisher.body);
    } catch (error) {
      console.log('read all publisher handler error: ', error);
      const resBody = {
        status: false,
        message: 'read all publisher handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async readPublisherByIdHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
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

      const readPublisherById = await publisherService.readPublisherById(Number(id));

      return response(h, readPublisherById.code, readPublisherById.body);
    } catch (error) {
      console.log('read publisher handler error: ', error);
      const resBody = {
        status: false,
        message: 'read publisher handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async updatePublisherByIdHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
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

      const updatePublisherById = await publisherService.updatePublisherById(Number(id), request.payload as IPublisher);

      return response(h, updatePublisherById.code, updatePublisherById.body);
    } catch (error) {
      console.log('update publisher handler error: ', error);
      const resBody = {
        status: false,
        message: 'update publisher handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async deletePublisherByIdHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
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

      const deletePublisherById = await publisherService.deletePublisherById(Number(id));

      return response(h, deletePublisherById.code, deletePublisherById.body);
    } catch (error) {
      console.log('delete publisher handler error: ', error);
      const resBody = {
        status: false,
        message: 'delete publisher handler error',
      }

      return response(h, 500, resBody);
    }
  }
}

export default new PublisherHandler();
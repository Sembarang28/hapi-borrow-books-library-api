import Hapi from '@hapi/hapi';
import response from '../../../helpers/response';

class PublisherHandler {
  async createPublisherHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {

    } catch (error) {
      console.log('create publisher handler error: ', error);
      const resBody = {
        status: false,
        message: 'create publisher handler error',
      }

      return response(h, 500, resBody);
    }
  }
}

import Hapi from '@hapi/hapi';
import response from '../../helpers/response';

class AdminHandler {
  async updateAdminHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const {
        name,
        job,
        birthPlace,
        birthDate,
        address
      } = request.payload as {
        name: string,
        job: string,
        birthPlace: string,
        birthDate: string,
        address: string,
      };




    } catch (error) {
      console.log('update admin handler error: ', error);
      const resBody = {
        status: false,
        message: 'update admin handler error',
      }

      return response(h, 500, resBody);
    }
  }
}
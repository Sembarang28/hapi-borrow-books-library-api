import Hapi from '@hapi/hapi';
import response from '../helpers/response';

class authHandler {
  async login(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { email, password } = request.payload;


    } catch (error) {
      console.log('login module error: ', error);
      const resBody = {
        status: false,
        message: 'login module error',
      }
      return response(h, 500, resBody);
    }
  }
}

export default new authHandler();
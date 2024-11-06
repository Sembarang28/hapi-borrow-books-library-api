import Hapi from '@hapi/hapi';
import response from '../helpers/response';
import authService from './service'

class AuthHandler {
  async login(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { email, password } = request.payload as { email: string, password: string };

      const login = await authService.login(email, password);

      return response(h, login.code, login.body, login.body.data?.refreshToken);
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

export default new AuthHandler();
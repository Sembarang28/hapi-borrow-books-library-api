import Hapi from '@hapi/hapi';
import response from '../helpers/response';
import authService from './service';
import jwt from '@hapi/jwt';

class AuthHandler {
  async login(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { email, password } = request.payload as { email: string, password: string };

      const login = await authService.login(email, password);

      return response(h, login.code, login.body, login.body.data?.refreshToken);
    } catch (error) {
      console.log('login handler error: ', error);
      const resBody = {
        status: false,
        message: 'login handler error',
      }
      return response(h, 500, resBody);
    }
  }

  async refreshToken(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      console.log('test')
      const refreshToken = request.state.refreshToken;
      console.log(refreshToken);

      if (!refreshToken) {
        const resBody = {
          status: false,
          message: 'Invalid refresh token',
        }
        return response(h, 401, resBody);
      }

      const refresh = await authService.refreshToken(refreshToken);

      return response(h, refresh.code, refresh.body);
    } catch (error) {
      console.log('login handler error: ', error);
      const resBody = {
        status: false,
        message: 'refresh token handler error',
      }
      return response(h, 500, resBody);
    }
  }
}

export default new AuthHandler();
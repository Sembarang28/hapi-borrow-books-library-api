import Hapi from '@hapi/hapi';
import response from '../helpers/response';
import authService from './service';
import IAuth from '../interfaces/auth';

class AuthHandler {
  async login(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const login = await authService.login(request.payload as IAuth);

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
      const refreshToken = request.state.refreshToken;

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
      console.log('refresh token handler error: ', error);
      const resBody = {
        status: false,
        message: 'refresh token handler error',
      }
      return response(h, 500, resBody);
    }
  }


  async logout(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const resBody = {
        status: true,
        message: 'Logout berhasil!'
      }
      return h.response(resBody).unstate('refreshToken');
    } catch (error) {
      console.log('logout handler error: ', error);
      const resBody = {
        status: false,
        message: 'logout handler error',
      }
      return response(h, 500, resBody);
    }
  }
}

export default new AuthHandler();
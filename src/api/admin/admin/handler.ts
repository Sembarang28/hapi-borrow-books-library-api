import Hapi from '@hapi/hapi';
import response from '../../../helpers/response';
import adminServices from './service';
import IUser from '../../../interfaces/user';
import { Password } from '../../../interfaces/auth';

class AdminHandler {
  async updateAdminHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { userId, role } = request.auth.credentials as { userId: string, role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const updateAdmin = await adminServices.updateAdmin(userId, request.payload as IUser);

      return response(h, updateAdmin.code, updateAdmin.body);
    } catch (error) {
      console.log('update admin handler error: ', error);
      const resBody = {
        status: false,
        message: 'update admin handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async updatePasswordHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { userId, role } = request.auth.credentials as { userId: string, role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const updatePassword = await adminServices.updatePassword(userId, request.payload as Password);

      return response(h, updatePassword.code, updatePassword.body);
    } catch (error) {
      console.log('update password handler error: ', error);
      const resBody = {
        status: false,
        message: 'update password handler error',
      }

      return response(h, 500, resBody);
    }
  }
}


export default new AdminHandler();
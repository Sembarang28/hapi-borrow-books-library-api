import Hapi from '@hapi/hapi';
import response from '../../../helpers/response';
import userService from './service';
import IUser from '../../../interfaces/user';
import { Password } from '../../../interfaces/auth';

class UserHandler {
  async createUserHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { userId: string, role: string };

      if (role !== 'user') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const {
        email,
        password,
        name,
        job,
        birthDate,
        birthPlace,
        address,
      } = request.payload as {
        email: string,
        password: string,
        name: string,
        job: string,
        birthDate: string,
        birthPlace: string,
        address: string,
      }

      const data: IUser = {
        email,
        name,
        job,
        birthDate,
        birthPlace,
        address,
      }

      const createUser = await userService.createUserService(data, password);

      return response(h, createUser.code, createUser.body);
    } catch (error) {
      console.log('create user handler error: ', error);
      const resBody = {
        status: false,
        message: 'create user handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async readUserHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { userId, role } = request.auth.credentials as { userId: string, role: string };

      if (role !== 'user') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const readUser = await userService.readUserService(userId);

      return response(h, readUser.code, readUser.body);
    } catch (error) {
      console.log('read user handler error: ', error);
      const resBody = {
        status: false,
        message: 'read user handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async updateUserHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { userId, role } = request.auth.credentials as { userId: string, role: string };

      if (role !== 'user') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const updateUser = await userService.updateUserService(userId, request.payload as IUser);

      return response(h, updateUser.code, updateUser.body);
    } catch (error) {
      console.log('update user handler error: ', error);
      const resBody = {
        status: false,
        message: 'update user handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async updatePasswordUserHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { userId, role } = request.auth.credentials as { userId: string, role: string };

      if (role !== 'user') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const updatePasswordUser = await userService.updatePassword(userId, request.payload as Password);

      return response(h, updatePasswordUser.code, updatePasswordUser.body);
    } catch (error) {
      console.log('update password user handler error: ', error);
      const resBody = {
        status: false,
        message: 'update password user handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async deleteUserHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { userId, role } = request.auth.credentials as { userId: string, role: string };

      if (role !== 'user') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const deleteUser = await userService.deleteUserService(userId);

      return response(h, deleteUser.code, deleteUser.body);
    } catch (error) {
      console.log('delete user handler error: ', error);
      const resBody = {
        status: false,
        message: 'delete user handler error',
      }

      return response(h, 500, resBody);
    }
  }
}

export default new UserHandler();
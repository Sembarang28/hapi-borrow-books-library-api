import response from '../../../helpers/response';
import IUser from '../../../interfaces/user';
import userService from './service';
import Hapi from '@hapi/hapi';

class UserHandler {
  async createUser(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { role: string };

      if (role !== 'admin') {
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

      const createUser = await userService.createUser(data, password);

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

  async readAllUser(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const { search } = request.query as { search: string } || "";

      const readAllUser = await userService.readAllUser(search);

      return response(h, readAllUser.code, readAllUser.body);
    } catch (error) {
      console.log('read all user handler error: ', error);
      const resBody = {
        status: false,
        message: 'read all user handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async readUserById(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const { id } = request.params;

      const readUserById = await userService.readUserById(id);

      return response(h, readUserById.code, readUserById.body);
    } catch (error) {
      console.log('read user handler error: ', error);
      const resBody = {
        status: false,
        message: 'read user handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async updateUserById(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const { id } = request.params;

      const updateUserById = await userService.updateUserById(id, request.payload as IUser);

      return response(h, updateUserById.code, updateUserById.body);
    } catch (error) {
      console.log('update user handler error: ', error);
      const resBody = {
        status: false,
        message: 'update user handler error',
      }

      return response(h, 500, resBody);
    }
  }

  async updateUserPasswordById(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    try {
      const { role } = request.auth.credentials as { role: string };

      if (role !== 'admin') {
        const resBody = {
          status: false,
          message: 'Forbidden'
        }
        return response(h, 403, resBody);
      }

      const { id } = request.params;
      const { password } = request.payload as { password: string } || "";

      const updateUserPasswordById = await userService.updateUserPasswordById(id, password);

      return response(h, updateUserPasswordById.code, updateUserPasswordById.body);
    } catch (error) {
      console.log('update user handler error: ', error);
      const resBody = {
        status: false,
        message: 'update user handler error',
      }

      return response(h, 500, resBody);
    }
  }
}

export default new UserHandler();
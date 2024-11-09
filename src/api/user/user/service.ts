import IUser from "../../../interfaces/user";
import userModel from "../../../models/user";
import bcrypt from 'bcrypt';

class UserService {
  async createUserService(data: IUser, password: string) {
    try {
      const hashPassword = bcrypt.hashSync(password, 10);

      await userModel.createUser(data, hashPassword);

      return {
        body: {
          status: true,
          message: 'data berhasil ditambah!',
        },
        code: 201,
      }
    } catch (error) {
      console.log('create user service error: ', error);
      return {
        body: {
          status: false,
          message: 'create user service error!',
        },
        code: 500,
      }
    }
  }

  async readUserService() {
    try {

    } catch (error) {
      console.log('read user service error: ', error);
      return {
        body: {
          status: false,
          message: 'read user service error!',
        },
        code: 500,
      }
    }
  }

  async updateUserService() {
    try {

    } catch (error) {
      console.log('update user service error: ', error);
      return {
        body: {
          status: false,
          message: 'update user service error!',
        },
        code: 500,
      }
    }
  }

  async deleteUserService() {
    try {

    } catch (error) {
      console.log('delete user service error: ', error);
      return {
        body: {
          status: false,
          message: 'delete user service error!',
        },
        code: 500,
      }
    }
  }
}

export default new UserService();
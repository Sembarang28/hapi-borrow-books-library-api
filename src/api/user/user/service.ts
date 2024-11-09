import { Password } from "../../../interfaces/auth";
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
      };
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

  async readUserService(id: string) {
    try {
      const readUser = await userModel.findUserById(id);

      if (!readUser) {
        return {
          body: {
            status: false,
            message: 'Data tidak berhasil ditemukan!',
          },
          code: 404,
        }
      }

      const data = {
        email: readUser.email,
        name: readUser.profile?.name,
        job: readUser.profile?.job,
        birthDate: readUser.profile?.birthDate,
        birthPlace: readUser.profile?.birthPlace,
        address: readUser.profile?.address,
      }

      return {
        body: {
          status: true,
          message: 'data berhasil ditemukan!',
          data,
        },
        code: 200,
      };
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

  async updateUserService(id: string, data: IUser) {
    try {
      await userModel.updateUser(id, data);

      return {
        body: {
          status: true,
          message: 'data berhasil diubah!',
        },
        code: 200,
      };
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

  async updatePassword(id: string, password: Password) {
    try {
      if (password.newPassword !== password.confirmPassword) {
        return {
          body: {
            status: false,
            message: 'Password baru dan password konfirmasi tidak sama!',
          },
          code: 400
        }
      }

      const user = await userModel.findUserById(id);

      if (!user) {
        return {
          body: {
            status: false,
            message: 'User not found!',
          },
          code: 404,
        }
      }

      if (!bcrypt.compareSync(password.oldPassword, user.password)) {
        return {
          body: {
            status: false,
            message: 'Password lama salah!'
          },
          code: 400
        }
      }

      const hashPassword = bcrypt.hashSync(password.newPassword, 10);

      await userModel.updateUserPassword(id, hashPassword);

      return {
        body: {
          status: true,
          message: 'Password berhasil diubah!',
        },
        code: 200
      };
    } catch (error) {
      console.log('password service error: ', error);
      return {
        body: {
          status: false,
          message: 'password service error!',
        },
        code: 500,
      }
    }
  }

  async deleteUserService(id: string) {
    try {
      await userModel.deleteUser(id);

      return {
        body: {
          status: true,
          message: 'data berhasil dihapus!',
        },
        code: 200,
      };
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
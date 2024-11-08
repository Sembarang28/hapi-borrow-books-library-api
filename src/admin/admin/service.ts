import { Password } from "../../interfaces/auth";
import IUser from "../../interfaces/user";
import UserModel from "../../models/user";
import bcrypt from 'bcrypt';

class AdminServices {
  async updateAdmin(id: string, adminData: IUser) {
    try {
      await UserModel.updateUser(id, adminData);

      return {
        body: {
          status: true,
          message: 'data berhasil diubah!',
        },
        code: 200,
      }
    } catch (error) {
      console.log('update admin service error: ', error);
      return {
        body: {
          status: false,
          message: 'update admin service error!',
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

      const user = await UserModel.findUserById(id);

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

      await UserModel.updateUserPassword(id, hashPassword);

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
}

export default new AdminServices();
import IUser from "../../../interfaces/user";
import userModel from "../../../models/user";
import bcrypt from 'bcrypt';

class UserService {
  async createUser(data: IUser, password: string) {
    try {
      const hashPassword: string = bcrypt.hashSync(password, 10);

      await userModel.createUser(data, hashPassword);

      return {
        body: {
          status: true,
          message: 'Data berhasil ditambah',
        },
        code: 201,
      };
    } catch (error) {
      console.log('create user service error: ', error);
      return {
        body: {
          status: false,
          message: 'create user service error'
        },
        code: 500,
      };
    }
  }

  async readAllUser(search: string) {
    try {
      const readAllUser = await userModel.readAllUser(search);

      if (!readAllUser[0]) {
        return {
          body: {
            status: false,
            message: 'Data tidak berhasil ditemukan!',
          },
          code: 404,
        };
      }

      const data = readAllUser.map((user) => ({
        id: user.id,
        email: user.email,
        name: user.profile?.name,
        job: user.profile?.job,
        birthDate: user.profile?.birthDate,
        birthPlace: user.profile?.birthPlace,
        address: user.profile?.address,
      }));

      return {
        body: {
          status: true,
          message: 'Data berhasil ditemukan',
          data,
        },
        code: 200,
      };
    } catch (error) {
      console.log('read all user service error: ', error);
      return {
        body: {
          status: false,
          message: 'read all user service error'
        },
        code: 500,
      };
    }
  }

  async readUserById(id: string) {
    try {
      const readUserById = await userModel.findUserById(id);

      if (!readUserById) {
        return {
          body: {
            status: false,
            message: 'Data tidak berhasil ditemukan!',
          },
          code: 404,
        };
      }

      const data = {
        id: readUserById.id,
        email: readUserById.email,
        name: readUserById.profile?.name,
        job: readUserById.profile?.job,
        birthDate: readUserById.profile?.birthDate,
        birthPlace: readUserById.profile?.birthPlace,
        address: readUserById.profile?.address,
      }

      return {
        body: {
          status: true,
          message: 'Data berhasil ditemukan',
          data,
        },
        code: 200,
      };
    } catch (error) {
      console.log('read useByIdr service error: ', error);
      return {
        body: {
          status: false,
          message: 'read useByIdr service error'
        },
        code: 500,
      };
    }
  }

  async updateUserById(id: string, data: IUser) {
    try {
      await userModel.updateUser(id, data);

      return {
        body: {
          status: true,
          message: 'Data berhasil diubah',
        },
        code: 200,
      };
    } catch (error) {
      console.log('update user service error: ', error);
      return {
        body: {
          status: false,
          message: 'update user service error'
        },
        code: 500,
      };
    }
  }

  async updateUserPasswordById(id: string, password: string) {
    try {
      const hashPassword: string = bcrypt.hashSync(password, 10);

      await userModel.updateUserPassword(id, hashPassword);

      return {
        body: {
          status: true,
          message: 'Password berhasil diubah',
        },
        code: 200,
      };
    } catch (error) {
      console.log('update user service error: ', error);
      return {
        body: {
          status: false,
          message: 'update user service error'
        },
        code: 500,
      };
    }
  }
}

export default new UserService();
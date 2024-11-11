import IUser from "../../../interfaces/user";
import userModel from "../../../models/user";

class UserService {
  async createUser(user: IUser) {
    try {

    } catch (error) {
      console.log('create book service error: ', error);
      return {
        body: {
          status: false,
          message: 'create book service error'
        },
        code: 500,
      };
    }
  }
}
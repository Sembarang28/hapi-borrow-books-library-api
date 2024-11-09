import prisma from "../config/databaseConnection";
import IUser from "../interfaces/user";

class UserModel {
  static async createUser(data: IUser, password: string) {
    return await prisma.user.create({
      data: {
        email: data.email,
        password: password,
        role: 'user',
        profile: {
          create: {
            name: data.name,
            job: data.job,
            birthDate: new Date(data.birthDate),
            birthPlace: data.birthPlace,
            address: data.address,
          }
        }
      }
    })
  }

  static async findUserById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        password: true,
        role: true,
        profile: true,
      },
    })
  }

  static async findUserByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        profile: {
          select: {
            id: true,
            name: true,
            job: true,
            birthDate: true,
            birthPlace: true,
            address: true,
          }
        }
      }
    });
  }

  static async updateUser(id: string, data: IUser) {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        email: data.email,
        profile: {
          update: {
            data: {
              name: data.name,
              job: data.job,
              birthDate: new Date(data.birthDate),
              birthPlace: data.birthPlace,
              address: data.address,
            }
          }
        }
      }
    });
  }

  static async updateUserPassword(id: string, password: string) {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      }
    })
  }
}

export default UserModel;
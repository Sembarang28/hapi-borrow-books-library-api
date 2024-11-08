import prisma from "../config/databaseConnection";

class AuthModel {
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
}

export default AuthModel;
import prisma from "../config/databaseConnection";
import bcrypt from 'bcrypt';
import jwt from '@hapi/jwt';

class AuthService {
  async login(email: string, password: string) {
    try {
      const user = await prisma.user.findFirst({
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

      if (!user) {
        return {
          body: {
            status: false,
            message: 'email or password not match!',
          },
          code: 401,
        }
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return {
          body: {
            status: false,
            message: 'email or password not match!',
          },
          code: 401,
        }
      }

      const refreshToken = jwt.token.generate(
        {
          userId: user.id,
          role: user.role,
        },
        { key: process.env.REFRESH_KEY as string, algorithm: 'HS256' },
        { ttlSec: 7 * 24 * 60 * 60 }
      );

      const accessToken = jwt.token.generate(
        {
          userId: user.id,
          role: user.role,
        },
        { key: process.env.ACCESS_KEY as string, algorithm: 'HS256' },
        { ttlSec: 3600 }
      );

      return {
        body: {
          status: true,
          message: 'Berhasil login!',
          data: {
            accessToken,
            refreshToken,
          }
        },
        code: 200,
      }
    } catch (error) {
      console.log('login service error: ', error);
      return {
        body: {
          status: false,
          message: 'login service error!',
        },
        code: 500,
      }
    }
  }

  async refreshToken(refreshToken: any) {
    try {
      const { decoded } = jwt.token.decode(refreshToken);
      jwt.token.verify(decoded, process.env.REFRESH_KEY as string);


      const { userId, role } = decoded.payload;

      const accessToken = jwt.token.generate(
        {
          userId,
          role,
        },
        { key: process.env.ACCESS_KEY as string, algorithm: 'HS256' },
        { ttlSec: 3600 }
      );

      return {
        body: {
          status: true,
          message: "New Access Token generated!",
        },
        code: 200
      }
    } catch (error) {
      console.log('refresh token service error: ', error);
      return {
        body: {
          status: false,
          message: 'Invalid or expired refresh token',
        },
        code: 401,
      }
    }
  }
}

export default new AuthService;
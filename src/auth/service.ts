import prisma from "../config/databaseConnection";
import bcrypt from 'bcrypt';
import Jwt, { JwtPayload } from 'jsonwebtoken';

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

      const refreshToken = Jwt.sign({
        userId: user.id,
        role: user.role,
      }, process.env.REFRESH_KEY as string, {
        expiresIn: '7d',
      });

      const accessToken = Jwt.sign({
        userId: user.id,
        role: user.role,
      }, process.env.ACCESS_KEY as string, {
        expiresIn: '1h',
      });

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
      const decoded: JwtPayload = Jwt.verify(refreshToken, process.env.REFRESH_KEY as string) as JwtPayload;

      const { userId, role } = decoded;

      const accessToken = Jwt.sign({
        userId,
        role,
      }, process.env.ACCESS_KEY as string, {
        expiresIn: '7d',
      });

      return {
        body: {
          status: true,
          message: "New Access Token generated!",
          data: {
            accessToken,
          }
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

export default new AuthService();
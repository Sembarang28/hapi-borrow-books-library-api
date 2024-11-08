import { Server } from '@hapi/hapi';
import Joi from 'joi';
import authHandler from './handler';

async function authRoutes(server: Server) {
  server.route([
    {
      method: 'POST',
      path: '/auth/login',
      handler: authHandler.login,
      options: {
        auth: false,
        validate: {
          payload: Joi.object({
            email: Joi.string().required(),
            password: Joi.string()
              .min(8)
              .max(64)
              .pattern(new RegExp("^[a-zA-Z0-9]{8,64}$"))
              .required(),
          }),
        }
      }
    },
    {
      method: 'POST',
      path: '/auth/refresh',
      handler: authHandler.refreshToken,
      options: {
        auth: false,
      }
    },
    {
      method: 'POST',
      path: '/auth/logout',
      handler: authHandler.logout,
      options: {
        auth: false,
      }
    }
  ]);
}

export default authRoutes;
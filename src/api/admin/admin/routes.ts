import { Server } from '@hapi/hapi'
import Joi from 'joi';
import adminHandler from './handler';

async function adminRoutes(server: Server) {
  server.route([
    {
      method: 'PUT',
      path: '/admin/pass',
      handler: adminHandler.updatePasswordHandler,
      options: {
        validate: {
          payload: Joi.object({
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().required(),
            confirmPassword: Joi.string().required(),
          }),
        },
      },
    },
    {
      method: 'PUT',
      path: '/admin',
      handler: adminHandler.updateAdminHandler,
      options: {
        validate: {
          payload: Joi.object({
            email: Joi.string().required(),
            name: Joi.string().required(),
            job: Joi.string().required(),
            birthDate: Joi.string().required(),
            birthPlace: Joi.string().required(),
            address: Joi.string().required(),
          }),
        },
      },
    },
  ])
}

export default adminRoutes;
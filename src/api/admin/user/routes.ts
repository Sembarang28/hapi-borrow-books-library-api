import { Server } from '@hapi/hapi';
import Joi from 'joi';
import userHandler from './handler';

async function userRoutes(server: Server) {
  server.route([
    {
      method: 'POST',
      path: '/admin/user',
      handler: userHandler.createUser,
      options: {
        validate: {
          payload: Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
            name: Joi.string().required(),
            job: Joi.string().required(),
            birthDate: Joi.string().required(),
            birthPlace: Joi.string().required(),
            address: Joi.string().required(),
          }),
        },
      },
    },
    {
      method: 'GET',
      path: '/admin/user',
      handler: userHandler.readAllUser,
    },
    {
      method: 'GET',
      path: '/admin/user/{id}',
      handler: userHandler.readUserById,
    },
    {
      method: 'PUT',
      path: '/admin/user/pass',
      handler: userHandler.updateUserPasswordById,
      options: {
        validate: {
          payload: Joi.object({
            password: Joi.string().required(),
          }),
        },
      },
    },
    {
      method: 'PUT',
      path: '/admin/user',
      handler: userHandler.updateUserById,
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
  ]);
}

export default userRoutes;
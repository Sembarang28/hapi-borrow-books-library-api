import { Server } from "@hapi/hapi";
import userHandler from './handler';
import Joi from "joi";

async function userRoutes(server: Server) {
  server.route([
    {
      method: 'POST',
      path: '/user',
      handler: userHandler.createUserHandler,
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
      path: '/user',
      handler: userHandler.readUserHandler,
    },
    {
      method: 'PUT',
      path: '/user/pass',
      handler: userHandler.updatePasswordUserHandler,
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
      path: '/user',
      handler: userHandler.updateUserHandler,
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
    {
      method: 'DELETE',
      path: '/user',
      handler: userHandler.deleteUserHandler,
    },
  ])
}

export default userRoutes;
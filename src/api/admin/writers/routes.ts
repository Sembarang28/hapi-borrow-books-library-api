import { Server } from '@hapi/hapi';
import Joi from 'joi';
import writerHandler from './handler';

async function writerRoutes(server: Server) {
  server.route([
    {
      method: 'POST',
      path: '/admin/writer',
      handler: writerHandler.createWriterHandler,
      options: {
        validate: {
          payload: Joi.object({
            name: Joi.string().required(),
            birthDate: Joi.string().required(),
            birthPlace: Joi.string().required(),
          }),
        },
      },
    },
    {
      method: 'GET',
      path: '/admin/writer',
      handler: writerHandler.readAllWriterHandler,
    },
    {
      method: 'GET',
      path: '/admin/writer/{id}',
      handler: writerHandler.readWriterByIdHandler,
    },
    {
      method: 'PUT',
      path: '/admin/writer/{id}',
      handler: writerHandler.updateWriterHandler,
      options: {
        validate: {
          payload: Joi.object({
            name: Joi.string().required(),
            birthDate: Joi.string().required(),
            birthPlace: Joi.string().required(),
          }),
        },
      },
    },
    {
      method: 'DELETE',
      path: '/admin/writer/{id}',
      handler: writerHandler.deleteWriterHandler,
    },
  ])
}

export default writerRoutes;
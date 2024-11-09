import { Server } from '@hapi/hapi';
import Joi from 'joi';
import bookHandler from './handler';

async function bookRoutes(server: Server) {
  server.route([
    {
      method: 'POST',
      path: '/admin/book',
      handler: bookHandler.createBookHandler,
      options: {
        validate: {
          payload: Joi.object({
            title: Joi.string().required(),
            year: Joi.string().required(),
            writerId: Joi.number().required(),
            publisherId: Joi.number().required(),
          }),
        }
      }
    },
    {
      method: 'GET',
      path: '/admin/book',
      handler: bookHandler.readAllBookHandler,

    },
    {
      method: 'GET',
      path: '/admin/book/{id}',
      handler: bookHandler.readBookByIdHandler,
    },
    {
      method: 'PUT',
      path: '/admin/book/{id}',
      handler: bookHandler.updateBookHandler,
      options: {
        validate: {
          payload: Joi.object({
            title: Joi.string().required(),
            year: Joi.string().required(),
            writerId: Joi.number().required(),
            publisherId: Joi.number().required(),
          }),
        }
      }
    },
    {
      method: 'DELETE',
      path: '/admin/book/{id}',
      handler: bookHandler.deleteBookHandler,
    },
  ])
}

export default bookRoutes;
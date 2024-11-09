import { Server } from '@hapi/hapi';
import Joi from 'joi';

async function borrowRoutes(server: Server) {
  server.route([
    {
      method: 'POST',
      path: '/admin/borrow',
      options: {
        validate: {
          payload: Joi.object({
            userId: Joi.string().required(),
            status: Joi.string().required(),
            borrowId: Joi.number().required(),
            returnDate: Joi.number().required(),
            books: Joi.array().items(Joi.string()).required(),
          }),
        }
      }
    },
    {
      method: 'GET',
      path: '/admin/borrow',

    },
    {
      method: 'GET',
      path: '/admin/borrow/{id}',
    },
    {
      method: 'PUT',
      path: '/admin/borrow/{id}',
      options: {
        validate: {
          payload: Joi.object({
            userId: Joi.string().required(),
            status: Joi.string().required(),
            borrowId: Joi.number().required(),
            returnDate: Joi.number().required(),
          }),
        }
      }
    },
    {
      method: 'DELETE',
      path: '/admin/borrow/{id}',
    },
  ]);
}

export default borrowRoutes;
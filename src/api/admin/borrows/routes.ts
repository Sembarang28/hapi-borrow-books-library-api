import { Server } from '@hapi/hapi';
import Joi from 'joi';
import borrowHandler from './handler';

async function borrowRoutes(server: Server) {
  server.route([
    {
      method: 'POST',
      path: '/admin/borrow',
      handler: borrowHandler.createBorrowHandler,
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
      handler: borrowHandler.readAllBorrowHandler,
    },
    {
      method: 'GET',
      path: '/admin/borrow/{id}',
      handler: borrowHandler.readBorrowByIdHandler,
    },
    {
      method: 'PUT',
      path: '/admin/borrow/{id}',
      handler: borrowHandler.updateBorrowByIdHandler,
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
      handler: borrowHandler.deleteBorrowByIdHandler,
    },
  ]);
}

export default borrowRoutes;
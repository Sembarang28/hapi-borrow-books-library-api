import { Server } from '@hapi/hapi';
import Joi from 'joi';
import borrowedBookHandler from './handler';

async function borrowedBooksRoutes(server: Server) {
  server.route([
    {
      method: 'POST',
      path: '/admin/borrow/book',
      handler: borrowedBookHandler.createBorrowBookHandler,
      options: {
        validate: {
          payload: Joi.object({
            borrowId: Joi.string().required(),
            bookId: Joi.string().required(),
          }),
        }
      }
    },
    {
      method: 'GET',
      path: '/admin/borrow/book/{id}',
      handler: borrowedBookHandler.readBorrowBookByIdHandler,
    },
    {
      method: 'PUT',
      path: '/admin/borrow/book/{id}',
      handler: borrowedBookHandler.updateBorrowBookByIdHandler,
      options: {
        validate: {
          payload: Joi.object({
            borrowId: Joi.string().required(),
            bookId: Joi.string().required(),
          }),
        }
      }
    },
    {
      method: 'DELETE',
      path: '/admin/borrow/book/{id}',
      handler: borrowedBookHandler.deleteBorrowBookByIdHandler,
    },
  ]);
}

export default borrowedBooksRoutes;
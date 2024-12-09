import { Server } from '@hapi/hapi';
import userBorrowHandler from './handler';
import Joi from 'joi';

async function userBorrowRoutes(server: Server) {
  server.route([
    {
      method: 'POST',
      path: '/user/borrow',
      handler: userBorrowHandler.createBorrowHandler,
      options: {
        validate: {
          payload: Joi.object({
            books: Joi.array().items(Joi.string()).required(),
          }),
        }
      }
    },
    {
      method: 'GET',
      path: '/user/borrow',
      handler: userBorrowHandler.readAllBorrowByUserIdHandler,
    },
    {
      method: 'GET',
      path: '/user/borrow/{id}',
      handler: userBorrowHandler.readBorrowByIdHandler,
    },
  ]);
}

export default userBorrowRoutes;
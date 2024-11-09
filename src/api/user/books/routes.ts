import { Server } from "@hapi/hapi";
import userBookHandler from './handler';

async function userBookRoutes(server: Server) {
  server.route([
    {
      method: 'GET',
      path: '/user/book',
      handler: userBookHandler.readAllBookHandler,

    },
    {
      method: 'GET',
      path: '/user/book/{id}',
      handler: userBookHandler.readBookByIdHandler,
    },
  ]);
}

export default userBookRoutes;
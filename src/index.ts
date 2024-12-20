import Hapi from "@hapi/hapi";
import dotenv from "dotenv";
import jwtConfig from "./config/jwtConfig";
import authRoutes from "./api/auth/routes";
import adminRoutes from "./api/admin/admin/routes";
import writerRoutes from "./api/admin/writers/routes";
import publisherRoutes from "./api/admin/publishers/routes";
import bookRoutes from "./api/admin/books/routes";
import borrowRoutes from "./api/admin/borrows/routes";
import borrowedBooksRoutes from "./api/admin/borrowedBooks/routes";
import userRoutes from "./api/user/user/routes";
import userBookRoutes from "./api/user/books/routes";
import userBorrowRoutes from "./api/user/borrow/routes";
import adminUserRoutes from "./api/admin/user/routes";
dotenv.config();

const port: number = Number(process.env.PORT) || 3000;
async function init() {
  const server: Hapi.Server = Hapi.server({
    port,
    host: "localhost",
    routes: {
      cors: {
        origin: ['*']
      },
    }
  });

  server.route({
    method: "GET",
    path: "/test",
    options: {
      auth: false,
    },
    handler: async function (request, h) {
      return h.response({
        status: true,
        message: "Hello World!!",
      });
    }
  });

  await jwtConfig(server);

  await adminUserRoutes(server);
  await authRoutes(server);
  await writerRoutes(server);
  await publisherRoutes(server);
  await bookRoutes(server);
  await borrowedBooksRoutes(server);
  await borrowRoutes(server);
  await adminRoutes(server);

  await userBookRoutes(server);
  await userBorrowRoutes(server);
  await userRoutes(server);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
}

init();


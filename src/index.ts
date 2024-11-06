import Hapi from "@hapi/hapi";
import dotenv from "dotenv";
import jwtConfig from "./config/jwtConfig";
import authRoutes from "./auth/routes";
dotenv.config();

const port: number = Number(process.env.PORT) || 3000;

async function init() {
  const server: Hapi.Server = Hapi.server({
    port,
    host: "localhost",
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

  await authRoutes(server);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
}

init();


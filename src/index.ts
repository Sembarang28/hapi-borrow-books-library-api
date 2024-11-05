import Hapi from "@hapi/hapi";
import dotenv from "dotenv";
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
    handler: async function (request, h) {
      return 'Hello, TypeScript with hapi!';
    }
  })

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
}

init();


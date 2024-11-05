import Hapi from "@hapi/hapi";

async function jwtConfig(server: Hapi.Server) {
  server.auth.strategy('jwt', 'jwt', {
    keys: process.env.JWT_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: 60 * 60,
    },
    validate: (artifacts: any, request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return { isValid: true, credentials: { userId: artifacts.decoded.payload.userId } };
    },
  });

  server.auth.default('jwt');
}
import Hapi from "@hapi/hapi";
import Jwt from '@hapi/jwt';

async function jwtConfig(server: Hapi.Server) {
  await server.register(Jwt);

  server.auth.strategy('jwt', 'jwt', {
    keys: process.env.ACCESS_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: 60 * 60,
    },
    validate: (artifacts: any, request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      const { userId, role } = artifacts.decoded.payload;

      if (userId && role) {
        return {
          isValid: true,
          credentials: { userId, role },
        };
      }

      return { isValid: false };
    },
  });

  server.auth.default('jwt');
}

export default jwtConfig;
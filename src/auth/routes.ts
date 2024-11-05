import { Server } from '@hapi/hapi';

async function authRoutes(server: Server) {
  server.route([
    {
      method: 'POST',
      path: '/auth/login',

    }
  ])
}

export default authRoutes;
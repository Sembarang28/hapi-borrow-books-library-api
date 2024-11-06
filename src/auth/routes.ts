import { Server } from '@hapi/hapi';

async function authRoutes(server: Server) {
  server.route([
    {
      method: 'POST',
      path: '/auth/login',
      options: {
        auth: false,
      }
    }
  ])
}

export default authRoutes;
import { Server } from '@hapi/hapi';
import Joi from 'joi';

async function publisherRoutes(server: Server) {
  server.route([
    {
      method: 'POST',
      path: '/publisher',
      options: {
        validate: {
          payload: Joi.object({
            name: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
          }),
        }
      }
    }
  ])
}
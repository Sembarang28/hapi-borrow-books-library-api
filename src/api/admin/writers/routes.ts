import { Server } from '@hapi/hapi';
import Joi from 'joi';

async function writerRoutes(server: Server) {
  server.route([
    {
      method: 'POST',
      path: '/admin/writer',
      options: {
        validate: {
          payload: Joi.object({
            name: Joi.string().required(),
            birthDate: Joi.string().required(),
            birthPlace: Joi.string().required(),
          }),
        },
      },
    },
  ])
}
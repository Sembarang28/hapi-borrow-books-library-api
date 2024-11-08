import { Server } from '@hapi/hapi'
import Joi from 'joi';

async function adminRoutes(server: Server) {
  server.route([
    {
      method: 'PUT',
      path: '/admin',
      options: {
        validate: {
          payload: {
            name: Joi.string().required(),
            job: Joi.string().required(),
            birthDate: Joi.string().required(),
            birthPlace: Joi.string().required(),
            address: Joi.string().required(),
          }
        }
      }
    }
  ])
}

export default adminRoutes;
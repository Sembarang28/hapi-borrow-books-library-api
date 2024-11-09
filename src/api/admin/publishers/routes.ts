import { Server } from '@hapi/hapi';
import Joi from 'joi';
import publisherHandler from './handler';

async function publisherRoutes(server: Server) {
  server.route([
    {
      method: 'POST',
      path: '/publisher',
      handler: publisherHandler.createPublisherHandler,
      options: {
        validate: {
          payload: Joi.object({
            name: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
          }),
        }
      }
    },
    {
      method: 'GET',
      path: '/publisher',
      handler: publisherHandler.readAllPublisherHandler,

    },
    {
      method: 'GET',
      path: '/publisher/{id}',
      handler: publisherHandler.readPublisherByIdHandler,
    },
    {
      method: 'PUT',
      path: '/publisher/{id}',
      handler: publisherHandler.updatePublisherByIdHandler,
      options: {
        validate: {
          payload: Joi.object({
            name: Joi.string().required(),
            address: Joi.string().required(),
            city: Joi.string().required(),
          }),
        }
      }
    },
    {
      method: 'DELETE',
      path: '/publisher/{id}',
      handler: publisherHandler.deletePublisherByIdHandler,
    },
  ])
}

export default publisherRoutes;
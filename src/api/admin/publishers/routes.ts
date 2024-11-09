import { Server } from '@hapi/hapi';
import Joi from 'joi';
import publisherHandler from './handler';

async function publisherRoutes(server: Server) {
  server.route([
    {
      method: 'POST',
      path: '/admin/publisher',
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
      path: '/admin/publisher',
      handler: publisherHandler.readAllPublisherHandler,

    },
    {
      method: 'GET',
      path: '/admin/publisher/{id}',
      handler: publisherHandler.readPublisherByIdHandler,
    },
    {
      method: 'PUT',
      path: '/admin/publisher/{id}',
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
      path: '/admin/publisher/{id}',
      handler: publisherHandler.deletePublisherByIdHandler,
    },
  ])
}

export default publisherRoutes;
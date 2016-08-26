'use strict';

const Controller     = require('./controller');
const MovieValidator = require('../../../validators/movie');

exports.register = (server, options, next) => {

  server.route([{
    method: 'POST',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.create(request.payload));
      },
      validate: {
        payload: MovieValidator
      }
    }
  },
  {
    method: 'GET',
    path: '/movies',
    config: {
      plugins: {
        queryFilter: { enabled: true }
      },
      handler: (request, reply) => {
        return reply(Controller.findAll(request.query));
      }
    }
  }
  ]);

  next();

};

exports.register.attributes = {
  name: 'movies'
};

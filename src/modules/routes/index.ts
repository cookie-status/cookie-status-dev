import * as fp from 'fastify-plugin';
const browser = require('browser-detect');

export default fp(async (server, opts, next) => {
  server.route({
    url: '/',
    logLevel: 'warn',
    method: ['GET', 'HEAD'],
    handler: async (request, reply) => {
      const result = await browser(request.headers['user-agent']);
      return reply.send({ date: new Date(), works: true, browser: result });
    }
  });
  next();
});

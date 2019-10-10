import * as fastify from 'fastify';
import * as http from 'http';

declare module 'fastify' {
  export interface FastifyInstance<
      HttpServer = http.Server,
      HttpRequest = http.IncomingMessage,
      HttpResponse = http.ServerResponse
      > {
    blipp(): void;
  }
}

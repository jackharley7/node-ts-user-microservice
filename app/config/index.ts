import koa from 'koa';
import body = require('koa-bodyparser');
import compress = require('koa-compress');
import Objection = require('objection');
import errorHandler = require('koa-json-logger-next');
import responseTime from 'koa-response-time-next';
import config from './configuration';

const Model = Objection.Model;

export default class Config {

  constructor(private app: koa) {
    this.app = app;
  }

  public build() {

    // db setup
    const knex = require('knex')(config.database);
    Model.knex(knex);

    // return response time in X-Response-Time header
    this.app.use(responseTime());

    // HTTP compression
    this.app.use(compress({}));

    // parse request body into ctx.request.body
    this.app.use(body());

    // Global Error handling
    this.app.use(errorHandler({
      // As this is behind the api gateway, surface errors
      surfaceErrors: true,
    }));

    return config;
  }
}

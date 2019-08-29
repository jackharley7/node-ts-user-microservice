'use strict';

global.Promise = require("bluebird");

import './controllers';

import koa = require('koa');
import http = require('http');
import router = require('koa-router');
import AppConfiguration from './config';
import config from './config/configuration';
import Routes from './routes/index';

import startGRPCServer from './grpcserver';

const koaApp = module.exports = new koa();
const koaRouter = new router({
  prefix: '/api',
});

const appConfiguration = new AppConfiguration(koaApp);
appConfiguration.build();

Routes(koaRouter);

koaApp.use(koaRouter.routes());

if (!module.parent) {
  const server = http.createServer(koaApp.callback());
  // Start server
  server.listen(config.port, config.ip, () => {
    console.log('KOA server listening on %d, in %s mode', config.port, koaApp.env);
  });
}

startGRPCServer();

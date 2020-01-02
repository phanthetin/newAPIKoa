import Koa from 'koa';
import routers from './routers';
import bodyParser from 'koa-bodyparser';
import {cfg} from './config'
import routeLog from './middlewares/route-log';
import whiteListOrigin from './middlewares/white-list-origin'

const app = new Koa();
app
  .use(whiteListOrigin)
  .use(routeLog)
  .use(bodyParser({    
    extendTypes: ['application/json'],
    onerror: function (err, ctx) {
      ctx.throw('Body parse error', 422);
    }
  }))
  .use(routers)

  app.listen(cfg('APP_PORT', parseInt), cfg('APP_HOST', String));

  console.log('Chay thanh cong tren %s:%s',cfg('APP_HOST', String), cfg('APP_PORT', parseInt));
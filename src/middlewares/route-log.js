import {cfg} from '../config';
import {getLogger} from '../services/logger';
const logger = getLogger('router');

async function routeLog(ctx, next) {
  let startTime = Date.now();
  let sign = '<->';
  let error = null;
  try {
    await next();
  } catch (e) {
    sign = 'xxx';
    error = e;
  }
  let ms = Date.now() - startTime;
  logger.http(`${sign} ${ctx.request.method.toUpperCase().padStart(6,' ')}[${error?error.status:ctx.response.status}] - ${ms}ms - ${ctx.request.url}`);
  if (null !== error) {
    ctx.throw(error.status, error.message);
  }
}

export default routeLog;
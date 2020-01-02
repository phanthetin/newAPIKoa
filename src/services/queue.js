import Queue from 'bee-queue';
import {cfg} from '../config';
import {getLogger} from './logger';
const logger = getLogger('BEE-QUEUE');
let all_queues = {}

function makeQueue(name, config) {
  if (all_queues.hasOwnProperty(name)){
    return all_queues[name];
  }
  config = config || {};
  config = Object.assign({
    prefix: cfg('REDIS_PREFIX')+':bq:',
    redis: {
      host: cfg('REDIS_HOST'),
      port: cfg('REDIS_PORT'),
      db: cfg('REDIS_DB')
    },
    isWorker: true
  }, config);
  const queue = new Queue(name, config);
  queue.on('error', (err)=>{
    logger.error('A queue error happened %s', err.message);
  });
  all_queues[name] = queue;  
  return queue;
}

export default makeQueue;

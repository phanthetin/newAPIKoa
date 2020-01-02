import redis from 'redis';
import bluebird from 'bluebird';
import {cfg} from '../config';
  
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const redisClient = redis.createClient(cfg('REDIS_PORT'), cfg('REDIS_HOST'));

/**
 * Scan all keys which match the pattern
 * @param  {Number} cursor The starting point (as first page)
 * @param  {String} MATCH  The pattern to search
 * @param  {Number} COUNT  How many items in a page
 * @param  {Number} depth  How many page does Scan take? depth = 0 means no limit page.
 * @return {Array[String]} Searching result
 */
export async function scan(cursor, MATCH, COUNT, depth = 3) {
  let res;
  try	{
	  res = await redisClient.scanAsync(
	    cursor,
	    'MATCH', MATCH,
	    'COUNT', COUNT
	  );
  } catch(err) {
  	console.error(err);
  }

  res = res || [0,[]];
  
  // Update the cursor position for the next scan
  cursor = res[0]*1;

  // From <http://redis.io/commands/scan>:
  // 'An iteration starts when the cursor is set to 0,
  // and terminates when the cursor returned by the server is 0.'
  if (cursor === 0 || cursor == depth) {
      return res[1];
  }
  // Remember: more or less than COUNT or no keys may be returned
  // See http://redis.io/commands/scan#the-count-option
  // Also, SCAN may return the same key multiple times
  // See http://redis.io/commands/scan#scan-guarantees
  return res[1].concat(await scan(cursor, MATCH, COUNT));
}

function prefixAll(obj){
  const PREFIX = cfg('REDIS_PREFIX');
  for (let key of Object.keys(obj)){
    if (typeof obj[key] == 'function')  {
      obj["_"+key] = function (){
        let args = arguments;
        if (args.length > 0 && typeof args[0] == 'string'){
          args[0] = PREFIX+args[0];
          return obj[key].apply(this, args);
        }
      }
    }
  }
}
prefixAll(redis.RedisClient.prototype);
prefixAll(redis.Multi.prototype);
export default redisClient;


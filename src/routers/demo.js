import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx,next)=>{
    ctx.body = 'Hello API koa';
    await next();  
})
export default router;
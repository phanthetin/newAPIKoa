import Router from 'koa-router';
const router = new Router();

router.get('/', async (ctx,next)=>{
    ctx.body = 'Hello API koa'; 
})


router.get('/hello', async (ctx,next)=>{
    ctx.body = 'Hello API koa'; 
})

export default router;
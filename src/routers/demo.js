import Router from 'koa-router';
import {sequelize as conn } from '../models';


const router = new Router();

router.get('/user-group', async (ctx,next)=>{
    let users = await selectUser_group();
    ctx.body = users;
    await next();  
})
router.get('/', async (ctx,next)=>{
    ctx.body = 'Hello API koa';
    await next();  
})

async function selectUser_group() {
    let users  = await conn.query("select  * from user_group", { type: conn.QueryTypes.SELECT});
    return users ;
  }
  

export default router;

import compose from 'koa-compose';
import demo from './demo';
import Sequelize from 'sequelize';





//List router
let routers = [
  demo
];
//List router
let middleware = [];
routers.forEach((router) => {
  middleware.push(router.routes())
  middleware.push(router.allowedMethods())
});
export default  compose(middleware);
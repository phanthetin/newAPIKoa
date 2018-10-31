import Koa from 'koa';
import routers from './routers'

const app = new Koa();

app.use(routers)
app.listen(3011);

console.log('Chay thanh cong tren port localhost:%s',3011)
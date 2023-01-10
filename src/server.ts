import App from '@/app';
import validateEnv from '@/utils/validateEnv';
import { container, registry } from 'tsyringe';
import { IRoutes } from './interfaces/routes.interface';
import { AuthRoute } from '@/routes/auth.route';
import { IndexRoute } from '@/routes/index.route';
import { UsersRoute } from '@/routes/users.route';
import { BuyerRoute } from './routes/buyer.route';
import { ProductRoute } from './routes/product.route';

validateEnv();

// registering the routes in tsyringe container
@registry([
  { token: 'Routes', useToken: IndexRoute },
  { token: 'Routes', useToken: AuthRoute },
  { token: 'Routes', useToken: UsersRoute },
  { token: 'Routes', useToken: BuyerRoute },
  { token: 'Routes', useToken: ProductRoute },
])
export class RoutesRegistry {}

const app = new App(container.resolveAll<IRoutes>('Routes'));

app.listen();

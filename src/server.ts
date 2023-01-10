import App from '@/app';
import validateEnv from '@/utils/validateEnv';
import { container, registry } from 'tsyringe';
import { IRoutes } from './interfaces/routes.interface';
import { AuthRoute } from '@/routes/auth.route';
import { IndexRoute } from '@/routes/index.route';
import { UsersRoute } from '@/routes/users.route';

validateEnv();

// registering the routes in tsyringe container
@registry([
  { token: 'Routes', useToken: IndexRoute },
  { token: 'Routes', useToken: AuthRoute },
  { token: 'Routes', useToken: UsersRoute },
])
export class RoutesRegistry {}

const app = new App(container.resolveAll<IRoutes>('Routes'));

app.listen();

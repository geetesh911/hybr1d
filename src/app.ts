import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { injectable } from 'tsyringe';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@/config';
import { IRoutes } from '@/interfaces/routes.interface';
import errorMiddleware from '@/middlewares/error.middleware';
import { logger, stream } from '@/utils/logger';

@injectable()
class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: IRoutes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 5000;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`==================================`);
      logger.info(`======== ENV: ${this.env} ========`);
      logger.info(` 🚀App listening on the port ${this.port}`);
      logger.info(`==================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async initializeMiddlewares() {
    // run inside `async` function
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: IRoutes[]) {
    routes.forEach(route => {
      this.app.use('/api/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;

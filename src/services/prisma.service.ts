import { logger } from '@/utils/logger';
import { PrismaClient } from '@prisma/client';
import { injectable } from 'tsyringe';

@injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({ log: ['query', 'info', 'warn', 'error'] });
    this.timeLogging();
  }

  private async timeLogging() {
    this.$use(async (params, next) => {
      const before = Date.now();

      const result = await next(params);

      const after = Date.now();

      logger.info(`Query ${params.model}.${params.action} took ${after - before}ms`);

      return result;
    });
  }
}

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
    console.info('Prisma loaded.');
  }

  async onModuleInit() {
    console.info('Connecting Prisma...');
    await this.$connect();
  }

  async onModuleDestroy() {
    console.info('Disconnecting Prisma');
    await this.$disconnect();
  }
}

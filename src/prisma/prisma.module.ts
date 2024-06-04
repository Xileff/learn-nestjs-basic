import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

// @Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
}) // module sharing + provider sharing
export class PrismaModule {}

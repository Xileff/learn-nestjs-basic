import { Inject, Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger,
  ) {
    this.logger.log('Create user repository');
  }

  async save(firstName: string, lastName?: string): Promise<User> {
    this.logger.debug(
      `Create user with first name '${firstName}' and last name '${lastName}'`,
    );
    return await this.prismaService.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    });
  }
}

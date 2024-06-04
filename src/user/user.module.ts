import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, createConnection } from './connection/connection';
import { MailService, mailService } from './mail/mail.service';
import { UserRepository } from './user-repository/user-repository';
import { MemberService } from './member/member.service';
import { ConfigService } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // module sharing + provider sharing (needed if module not global)
  controllers: [UserController],
  // Providers -> to inject object of a Provider class as a dependency to other objects (Controller, or others)... Dependency Injection concept
  providers: [
    // 1. Standard Provider
    UserService,

    // 2. Class Provider : can change class according to condition (ex : .env), change to 5.a
    // {
    //   provide: Connection,
    //   useClass:
    //     process.env.DATABASE === 'MySQL' ? MySQLConnection : MongoDBConnection,
    // },

    // 3. Value Provider : create instance from the class (ex : from external library)
    {
      provide: MailService,
      useValue: mailService,
    },
    // 4. Alias Provider
    {
      provide: 'EmailService',
      useValue: mailService,
    },
    UserRepository,
    // 5.a. Configuration : read data from .env
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService],
    },

    MemberService,
  ],
  exports: [UserService],
})
export class UserModule {}

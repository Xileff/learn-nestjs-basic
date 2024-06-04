import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {
  Connection,
  MongoDBConnection,
  MySQLConnection,
} from './connection/connection';
import { MailService, mailService } from './mail/mail.service';
import {
  UserRepository,
  createUserRepository,
} from './user-repository/user-repository';
import { MemberService } from './member/member.service';

@Module({
  controllers: [UserController],
  // Providers -> to inject object of a Provider class as a dependency to other objects (Controller, or others)... Dependency Injection concept
  providers: [
    // 1. Standard Provider
    UserService,

    // 2. Class Provider : can change class according to condition (ex : .env)
    {
      provide: Connection,
      useClass:
        process.env.DATABASE === 'MySQL' ? MySQLConnection : MongoDBConnection,
    },

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

    // 5. Factory Provider : inject value into an instance from external library
    {
      provide: UserRepository,
      useFactory: createUserRepository,
      inject: [Connection],
    },

    MemberService,
  ],
})
export class UserModule {}

import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  Inject,
  Query,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';
import { User } from '@prisma/client';
import { ValidationFilter } from 'src/validation/validation.filter';

@Controller('/api/users')
export class UserController {
  // Dependency Injection thru constructor mechanism :
  // All properties instantiated as singletons and provided by 'Provider' in user.module.ts
  constructor(
    private userService: UserService,
    private connection: Connection,
    private mailService: MailService,
    private userRepository: UserRepository,
    @Inject('EmailService') private emailService: MailService,
    private memberService: MemberService,
  ) {}

  @Get('/connection')
  async getConnection(): Promise<string> {
    this.mailService.send();
    this.emailService.send();
    console.info(
      'From member service :',
      this.memberService.getConnectionName(),
    );
    this.memberService.sendEmail();
    return this.connection.getName();
  }

  @Get('/create')
  async createUser(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): Promise<User> {
    if (!firstName) {
      throw new HttpException(
        {
          message: 'first_name is required',
        },
        400,
      );
    }
    return await this.userRepository.save(firstName, lastName);
  }

  @UseFilters(ValidationFilter)
  @Get('/hello')
  sayHello(@Query('name') name: string): string {
    return this.userService.sayHello(name);
  }

  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() response: Response) {
    // express.Res
    response.render('index.html', {
      title: 'Template Engine',
      name,
    });
  }

  @Get('/set-cookie') // express.Res
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('success set cookie');
  }

  @Get('/get-cookie') // express.Req
  getCookie(@Req() request: Request): string {
    return 'Cookie received : ' + request.cookies['name'];
  }

  @Get('/sample-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  sampleResponse(): Record<string, string> {
    return {
      hello: 'world',
    };
  }

  @Get('/sample')
  get(): string {
    return 'GET';
  }

  @Get('/:id') // express.Req
  getRequest(@Req() request: Request): string {
    return `Id : ${request.params.id}`;
  }
}

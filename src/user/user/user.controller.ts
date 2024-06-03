import {
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';

@Controller('/api/users')
export class UserController {
  constructor(
    private userService: UserService,
    private connection: Connection, // clas provider : can change according to user.module.ts
  ) {} // dependency injection & will be a singleton

  @Get('/connection')
  async getConnection(): Promise<string> {
    return this.connection.getName();
  }

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

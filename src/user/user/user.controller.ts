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

@Controller('/api/users')
export class UserController {
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

  @Get('/hello')
  sayHello(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): string {
    return `Hello ${firstName} ${lastName}`;
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

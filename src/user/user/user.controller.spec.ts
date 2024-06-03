import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController], // unit test, only import UserController
      providers: [UserService], // dependency injection
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should can say hello', async () => {
    const response = await controller.sayHello('Felix');
    expect(response).toBe('Hello Felix');
  });

  it('should can get view', () => {
    const response = httpMock.createResponse(); // buat object mock response
    controller.viewHello('Felix', response); // manggil controller

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      name: 'Felix',
      title: 'Template Engine',
    });
  });
});

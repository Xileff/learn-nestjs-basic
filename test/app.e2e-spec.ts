import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // integration test : import the whole modules
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be able to say hello', async () => {
    const result = await request(app.getHttpServer())
      .get('/api/users/hello')
      .query({
        firstName: 'Felix',
        lastName: 'Savero',
      });

    expect(result.status).toBe(200);
    expect(result.text).toBe('Hello Felix Savero');
  });
});

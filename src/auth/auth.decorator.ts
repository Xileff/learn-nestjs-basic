import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// flow : client kirim request -> middleware tambahin data user -> request dibaca auth decorator -> data user dikasih ke controller yg panggil
// untuk mengambil data user pada request yang sebelumnya diutak-atik oleh auth middleware
export const Auth: any = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

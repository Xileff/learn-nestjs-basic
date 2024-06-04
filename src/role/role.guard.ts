import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from './role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // mengambil Roles dari context fungsi pemanggilan (user.controller /get-current)
    const roles: string[] = this.reflector.get(Roles, context.getHandler());
    if (!roles) return true;

    // user didapat dari req.user (AuthMiddleware)
    const user = context.switchToHttp().getRequest().user;
    return roles.indexOf(user.role) !== -1;
  }
}

import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './role.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Injectable()
export class RoleGuard extends AuthGuard {
  constructor(
    private readonly reflactor: Reflector,
    jwtService: JwtService,
  ) {
    super(jwtService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const baseResult = await super.canActivate(context);
    if (!baseResult) return false;

    const { user } = await context.switchToHttp().getRequest();

    if (!user) return false;

    const requiredRoles = this.reflactor.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return false;

    return requiredRoles.some((role: string) => user?.roles?.includes(role));
  }
}

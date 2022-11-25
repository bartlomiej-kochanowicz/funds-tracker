import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private refrector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const isPublic = this.refrector.getAllAndOverride('isPublic', [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }
}

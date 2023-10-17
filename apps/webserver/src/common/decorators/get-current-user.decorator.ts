import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    const request = ctx.switchToHttp().getRequest();

    if (!data) return request?.user ?? ctx.getContext().req.user;

    return request?.user?.[data] ?? ctx.getContext().req.user[data];
  },
);

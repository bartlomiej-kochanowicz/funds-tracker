import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetCurrentUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext): string => {
    const ctx = GqlExecutionContext.create(context);

    const request = ctx.switchToHttp().getRequest();

    return request?.user?.sub ?? ctx.getContext().req.user.sub;
  },
);

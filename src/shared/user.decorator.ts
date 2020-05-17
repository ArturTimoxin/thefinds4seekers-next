import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// for get user data from jwt strategy
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
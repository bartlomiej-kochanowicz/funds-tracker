"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUser = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.GetCurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    const request = ctx.switchToHttp().getRequest();
    if (!data)
        return request?.user ?? ctx.getContext().req.user;
    return request?.user?.[data] ?? ctx.getContext().req.user[data];
});
//# sourceMappingURL=get-current-user.decorator.js.map
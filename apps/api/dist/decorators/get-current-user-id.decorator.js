"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUserId = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.GetCurrentUserId = (0, common_1.createParamDecorator)((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    const request = ctx.switchToHttp().getRequest();
    return request?.user?.sub ?? ctx.getContext().req.user.sub;
});
//# sourceMappingURL=get-current-user-id.decorator.js.map
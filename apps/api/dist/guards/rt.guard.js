"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtGuard = void 0;
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
class RtGuard extends (0, passport_1.AuthGuard)("jwt-refresh") {
    constructor() {
        super();
    }
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}
exports.RtGuard = RtGuard;
//# sourceMappingURL=rt.guard.js.map
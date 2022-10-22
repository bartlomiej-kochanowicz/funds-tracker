"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserObj = void 0;
const common_1 = require("@nestjs/common");
exports.UserObj = (0, common_1.createParamDecorator)((data, context) => {
    return context.switchToHttp().getRequest().user;
});
//# sourceMappingURL=user-obj.decorator.js.map
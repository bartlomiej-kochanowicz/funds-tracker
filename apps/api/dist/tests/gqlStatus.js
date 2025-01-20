"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGqlErrorStatus = void 0;
const getGqlErrorStatus = (response) => response.body.errors[0].extensions.originalError.statusCode;
exports.getGqlErrorStatus = getGqlErrorStatus;
//# sourceMappingURL=gqlStatus.js.map
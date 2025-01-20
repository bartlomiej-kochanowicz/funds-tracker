"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_TEST = exports.IS_PRODUCTION = exports.IS_DEVELOPMENT = void 0;
exports.IS_DEVELOPMENT = process.env.NODE_ENV !== "production";
exports.IS_PRODUCTION = process.env.NODE_ENV === "production";
exports.IS_TEST = process.env.NODE_ENV === "test";
//# sourceMappingURL=env.js.map
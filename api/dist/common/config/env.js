"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_DEVELOPMENT = exports.RT_SECRET = exports.AT_SECRET = exports.API_PORT = void 0;
exports.API_PORT = process.env.API_PORT;
exports.AT_SECRET = process.env.AT_SECRET;
exports.RT_SECRET = process.env.RT_SECRET;
exports.IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
//# sourceMappingURL=env.js.map
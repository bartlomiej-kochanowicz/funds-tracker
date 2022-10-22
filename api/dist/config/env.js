"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IN_DEVELOPMENT = exports.API_PORT = exports.MONGO_PASSWORD = exports.MONGO_USERNAME = exports.MONGO_DATABASE = exports.MONGO_PORT = exports.MONGO_HOSTNAME = void 0;
exports.MONGO_HOSTNAME = process.env.MONGO_HOSTNAME;
exports.MONGO_PORT = process.env.MONGO_PORT;
exports.MONGO_DATABASE = process.env.MONGO_DATABASE;
exports.MONGO_USERNAME = process.env.MONGO_USERNAME;
exports.MONGO_PASSWORD = process.env.MONGO_PASSWORD;
exports.API_PORT = process.env.API_PORT;
exports.IN_DEVELOPMENT = process.env.NODE_ENV !== 'production';
//# sourceMappingURL=env.js.map
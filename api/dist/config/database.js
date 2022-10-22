"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_URL = void 0;
const env_1 = require("./env");
exports.DB_URL = `mongodb://${env_1.MONGO_USERNAME}:${env_1.MONGO_PASSWORD}@${env_1.MONGO_HOSTNAME}:${env_1.MONGO_PORT}/${env_1.MONGO_DATABASE}`;
//# sourceMappingURL=database.js.map
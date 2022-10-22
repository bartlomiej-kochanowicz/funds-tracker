"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPwd = void 0;
const env_1 = require("../config/env");
const crypto = require("crypto");
const hashPwd = (p) => {
    const hmac = crypto.createHmac('sha512', env_1.PWD_HASH);
    hmac.update(p);
    return hmac.digest('hex');
};
exports.hashPwd = hashPwd;
//# sourceMappingURL=hashPwd.js.map
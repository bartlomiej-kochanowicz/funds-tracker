"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
exports.AuthService = jest.fn().mockReturnValue({
    signupLocal: jest.fn(),
    signinLocal: jest.fn(),
    logout: jest.fn(),
    refreshToken: jest.fn(),
});
//# sourceMappingURL=auth.service.js.map
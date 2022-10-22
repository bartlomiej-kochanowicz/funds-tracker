"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_controller_1 = require("auth/auth.controller");
const auth_service_1 = require("auth/auth.service");
const auth_stub_1 = require("./stubs/auth.stub");
const tokens_stub_1 = require("./stubs/tokens.stub");
jest.mock('auth/auth.service');
describe('AuthController', () => {
    let authController;
    let authService;
    beforeEach(async () => {
        const moduleRef = await testing_1.Test.createTestingModule({
            imports: [],
            controllers: [auth_controller_1.AuthController],
            providers: [auth_service_1.AuthService],
        }).compile();
        authController = moduleRef.get(auth_controller_1.AuthController);
        authService = moduleRef.get(auth_service_1.AuthService);
        jest.clearAllMocks();
    });
    describe('signupLocal', () => {
        describe('when signupLocal is called', () => {
            let tokens;
            beforeEach(async () => {
                tokens = await authController.signupLocal((0, auth_stub_1.authStub)());
            });
            it('should call signupLocal service', () => {
                expect(authService.signupLocal).toBeCalledWith((0, auth_stub_1.authStub)());
            });
            it('should return a tokens', () => {
                expect(tokens).toEqual((0, tokens_stub_1.tokensStub)());
            });
        });
    });
    describe('signinLocal', () => {
        describe('when signinLocal is called', () => {
            let tokens;
            beforeEach(async () => {
                tokens = await authController.signinLocal((0, auth_stub_1.authStub)());
            });
            it('should call signinLocal service', () => {
                expect(authService.signinLocal).toBeCalledWith((0, auth_stub_1.authStub)());
            });
            it('should return a tokens', () => {
                expect(tokens).toEqual((0, tokens_stub_1.tokensStub)());
            });
        });
    });
    describe('logout', () => {
        describe('when logout is called', () => {
            const userId = 'c40ddade-02c0-448a-84b7-56de4da2ca70';
            beforeEach(async () => {
                await authController.logout(userId);
            });
            it('should call logout service', () => {
                expect(authService.logout).toBeCalledWith(userId);
            });
        });
    });
    describe('refreshToken', () => {
        describe('when refreshToken is called', () => {
            let tokens;
            const refreshDto = {
                userId: 'c40ddade-02c0-448a-84b7-56de4da2ca70',
                refreshToken: 'refresh-token-mock',
            };
            beforeEach(async () => {
                tokens = await authController.refreshToken(refreshDto.userId, refreshDto.refreshToken);
            });
            it('should call refreshToken service', () => {
                expect(authService.refreshToken).toBeCalledWith(refreshDto.userId, refreshDto.refreshToken);
            });
            it('should return a tokens', () => {
                expect(tokens).toEqual((0, tokens_stub_1.tokensStub)());
            });
        });
    });
});
//# sourceMappingURL=auth.controller.spec.js.map
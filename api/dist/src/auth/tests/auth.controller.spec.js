"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const auth_controller_1 = require("auth/auth.controller");
const auth_service_1 = require("auth/auth.service");
const ts_jest_1 = require("@golevelup/ts-jest");
const auth_stub_1 = require("./stubs/auth.stub");
const mockResponseObject = () => (0, ts_jest_1.createMock)({
    json: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
});
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
            const res = mockResponseObject();
            beforeEach(async () => {
                await authController.signupLocal((0, auth_stub_1.signupStub)(), res);
            });
            it('should call signupLocal service', () => {
                expect(authService.signupLocal).toBeCalledWith((0, auth_stub_1.signupStub)(), res);
            });
        });
    });
    describe('signinLocal', () => {
        describe('when signinLocal is called', () => {
            const res = mockResponseObject();
            beforeEach(async () => {
                await authController.signinLocal((0, auth_stub_1.signinStub)(), res);
            });
            it('should call signinLocal service', () => {
                expect(authService.signinLocal).toBeCalledWith((0, auth_stub_1.signinStub)(), res);
            });
        });
    });
    describe('logout', () => {
        describe('when logout is called', () => {
            const userId = 'c40ddade-02c0-448a-84b7-56de4da2ca70';
            const res = mockResponseObject();
            beforeEach(async () => {
                await authController.logout(userId, res);
            });
            it('should call logout service', () => {
                expect(authService.logout).toBeCalledWith(userId, res);
            });
        });
    });
    describe('refreshToken', () => {
        describe('when refreshToken is called', () => {
            const refreshDto = {
                userId: 'c40ddade-02c0-448a-84b7-56de4da2ca70',
                refreshToken: 'refresh-token-mock',
            };
            const res = mockResponseObject();
            beforeEach(async () => {
                await authController.refreshToken(refreshDto.userId, refreshDto.refreshToken, res);
            });
            it('should call refreshToken service', () => {
                expect(authService.refreshToken).toBeCalledWith(refreshDto.userId, refreshDto.refreshToken, res);
            });
        });
    });
});
//# sourceMappingURL=auth.controller.spec.js.map
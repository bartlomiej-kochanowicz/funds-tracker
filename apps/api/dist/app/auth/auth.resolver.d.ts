import { Response } from "express";
import { ConfirmSignUp, Email, Logout, Refresh, ResetPassword, SetNewPassword, SignInLocal, SignUpLocal } from "./entities";
import { SendCode } from "./entities/send-code.entity";
import { ConfirmSignUpInput, EmailInput, ResetPasswordInput, SendCodeInput, SetNewPasswordInput, SignInInput, SignUpInput } from "./inputs";
import { SignUpService } from "./services/sign-up.service";
import { SignInService } from "./services/sign-in.service";
import { LogoutService } from "./services/logout.service";
import { PasswordService } from "./services/password.service";
import { TokenService } from "./services/token.service";
export declare class AuthResolver {
    private signUpService;
    private signInService;
    private logoutService;
    private passwordService;
    private tokenService;
    constructor(signUpService: SignUpService, signInService: SignInService, logoutService: LogoutService, passwordService: PasswordService, tokenService: TokenService);
    signUpLocal(signUpInput: SignUpInput): Promise<SignUpLocal>;
    confirmSignUp(confirmSignUpInput: ConfirmSignUpInput, res: Response): Promise<ConfirmSignUp>;
    sendCode(sendCodeInput: SendCodeInput): Promise<SendCode>;
    signInLocal(signInInput: SignInInput, res: Response): Promise<SignInLocal>;
    emailExist(emailInput: EmailInput): Promise<Email>;
    logout(userId: string, res: Response): Promise<Logout>;
    resetPassword(resetPasswordInput: ResetPasswordInput): Promise<ResetPassword>;
    setNewPassword(setNewPasswordInput: SetNewPasswordInput): Promise<SetNewPassword>;
    refreshToken(userId: string, refreshToken: string, res: Response): Promise<Refresh>;
}

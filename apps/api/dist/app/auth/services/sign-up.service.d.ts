import { PrismaService } from "@services/prisma/prisma.service";
import { Response } from "express";
import { AuthService } from "../auth.service";
import { ConfirmSignUp, SendCode, SignUpLocal } from "../entities";
import { ConfirmSignUpInput, SendCodeInput, SignUpInput } from "../inputs";
export declare class SignUpService {
    private prisma;
    private authService;
    constructor(prisma: PrismaService, authService: AuthService);
    signUpLocal(signUpInput: SignUpInput): Promise<SignUpLocal>;
    confirmSignUp(confirmSignUpInput: ConfirmSignUpInput, res: Response): Promise<ConfirmSignUp>;
    sendCode(sendCode: SendCodeInput): Promise<SendCode>;
}

import { Response } from "express";
import { PrismaService } from "@services/prisma/prisma.service";
import { Email, SignInLocal } from "../entities";
import { EmailInput, SignInInput } from "../inputs";
import { AuthService } from "../auth.service";
export declare class SignInService {
    private prisma;
    private authService;
    constructor(prisma: PrismaService, authService: AuthService);
    signInLocal(signInInput: SignInInput, res: Response): Promise<SignInLocal>;
    signInLocalForTests(email: string, sessionName: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    checkEmail(emailInput: EmailInput): Promise<Email>;
}

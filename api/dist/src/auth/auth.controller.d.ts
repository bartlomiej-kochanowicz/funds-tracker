import { User } from '@prisma/client';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto, EmailDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signupLocal(dto: SignupDto, res: Response): Promise<unknown>;
    signinLocal(dto: SigninDto, res: Response): Promise<unknown>;
    checkEmailExist(dto: EmailDto): Promise<{
        exist: boolean;
    }>;
    getAccount(userId: string): Promise<Pick<User, 'email' | 'uuid' | 'createdAt'>>;
    logout(userId: string, res: Response): Promise<unknown>;
    refreshToken(userId: string, refreshToken: string, res: Response): Promise<unknown>;
}

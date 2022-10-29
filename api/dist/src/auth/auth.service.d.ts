import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { SignupDto, SigninDto, EmailDto } from './dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private readonly httpService;
    constructor(prisma: PrismaService, jwtService: JwtService, httpService: HttpService);
    signupLocal(dto: SignupDto, res: Response): Promise<unknown>;
    signinLocal(dto: SigninDto, res: Response): Promise<Response<Pick<User, 'uuid' | 'email'>>>;
    checkEmail(dto: EmailDto): Promise<{
        exist: boolean;
    }>;
    getAccount(userId: string): Promise<Pick<User, 'email' | 'uuid' | 'createdAt' | 'name'>>;
    logout(userId: string, res: any): Promise<unknown>;
    refreshToken(userId: string, rt: string, res: Response): Promise<unknown>;
    private updateRtHash;
    private hashData;
    private getTokens;
    private validateHuman;
}

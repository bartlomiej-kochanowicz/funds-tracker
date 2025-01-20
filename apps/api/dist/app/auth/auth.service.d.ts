import { JwtService } from "@nestjs/jwt";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import { PrismaService } from "@services/prisma/prisma.service";
import { SendGridService } from "@services/send-grid/send-grid.service";
import { Tokens } from "./types";
export declare class AuthService {
    private prisma;
    private jwtService;
    private readonly httpService;
    private config;
    private readonly sendgridService;
    constructor(prisma: PrismaService, jwtService: JwtService, httpService: HttpService, config: ConfigService, sendgridService: SendGridService);
    sendEmailWithConfirmCode(email: string, uuid: string, code: string): Promise<void>;
    sendEmailWithResetPasswordLink(email: string, name: string, resetPasswordLink: string): Promise<void>;
    addSession(userId: string, newRt: string, name: string): Promise<void>;
    updateSession(userId: string, newRt: string, oldRtHash: string): Promise<void>;
    genereteIpName(res: Response): string;
    hashData(data: string): Promise<string>;
    getTokens(userId: string, email: string): Promise<Tokens>;
    generateConfirmationCode(): string;
    validateHuman(token: string): Promise<boolean>;
}

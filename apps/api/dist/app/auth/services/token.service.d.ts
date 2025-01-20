import { PrismaService } from "@services/prisma/prisma.service";
import { Response } from "express";
import { AuthService } from "../auth.service";
import { Refresh } from "../entities";
export declare class TokenService {
    private prisma;
    private authService;
    constructor(prisma: PrismaService, authService: AuthService);
    refreshToken(userId: string, rt: string, res: Response): Promise<Refresh>;
}

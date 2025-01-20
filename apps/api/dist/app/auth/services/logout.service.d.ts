import { PrismaService } from "@services/prisma/prisma.service";
import { Response } from "express";
import { Logout } from "../entities";
export declare class LogoutService {
    private prisma;
    constructor(prisma: PrismaService);
    logout(userId: string, res: Response): Promise<Logout>;
}

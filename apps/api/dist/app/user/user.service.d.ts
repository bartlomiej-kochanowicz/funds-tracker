import { PrismaService } from "@services/prisma/prisma.service";
import { User } from "./entities";
import { UpdateUserInput } from "./inputs";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getUser(userId: string): Promise<User>;
    updateUser(userId: string, updateUserInput: UpdateUserInput): Promise<User>;
}

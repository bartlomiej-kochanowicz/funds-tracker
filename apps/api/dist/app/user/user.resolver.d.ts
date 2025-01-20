import { User } from "./entities";
import { UpdateUserInput } from "./inputs";
import { UserService } from "./user.service";
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    user(userId: string): Promise<User>;
    updateUser(userId: string, updateUserInput: UpdateUserInput): Promise<User>;
}

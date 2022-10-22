import { UserDetails } from './interfaces/user-details';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUser(id: string): Promise<UserDetails | null>;
}

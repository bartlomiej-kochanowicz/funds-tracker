import { UserDetails } from './interfaces/user-details';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUser(id: string): Promise<UserDetails | null>;
}

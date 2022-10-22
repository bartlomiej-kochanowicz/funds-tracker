import { JwtPayload } from 'auth/interfaces/jwt';
import { UserService } from 'user/user.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(payload: JwtPayload, done: (error: any, user: any) => void): Promise<void>;
}
export {};

import { Model } from 'mongoose';
import { UserDetails } from './interfaces/user-details';
import { UserDocument } from './schemas/user.schema';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    getUserDetails(user: UserDocument): UserDetails;
    findByEmail(email: string): Promise<UserDocument | null>;
    findById(id: string): Promise<UserDetails | null>;
    create(name: string, email: string, hashedPassword: string): Promise<UserDocument>;
}

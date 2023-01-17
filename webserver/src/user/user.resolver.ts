import { Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUserId } from 'common/decorators';
import { User } from './entities';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  user(@GetCurrentUserId() userId: string): Promise<User> {
    return this.userService.getUser(userId);
  }
}

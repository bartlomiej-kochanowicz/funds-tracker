import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUserId } from '@common/decorators';
import { User } from './entities';
import { UpdateUserInput } from './inputs';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  user(@GetCurrentUserId() userId: string) {
    return this.userService.getUser(userId);
  }

  @Mutation(() => User)
  updateUser(
    @GetCurrentUserId() userId: string,
    @Args('data')
    updateUserInput: UpdateUserInput,
  ) {
    return this.userService.updateUser(userId, updateUserInput);
  }
}

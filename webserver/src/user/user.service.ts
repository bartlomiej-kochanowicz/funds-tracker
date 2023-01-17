import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateUser, User } from './entities';
import { UpdateUserInput } from './inputs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { uuid: userId },
    });

    return user;
  }

  async updateUser(userId: string, updateUserInput: UpdateUserInput): Promise<UpdateUser> {
    await this.prisma.user.update({
      where: { uuid: userId },
      data: updateUserInput,
    });

    return {
      success: true,
    };
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { WEBAPP_URL } from '@common/constants/common';
import { PrismaService } from '@app/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { ttl24h } from '@common/constants/redis';
import { AuthService } from '../auth.service';
import { ResetPassword, SetNewPassword } from '../entities';
import { ResetPasswordInput, SetNewPasswordInput } from '../inputs';

@Injectable()
export class PasswordService {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async resetPassword(resetPasswordInput: ResetPasswordInput): Promise<ResetPassword> {
    const { email, token } = resetPasswordInput;

    const isHuman = await this.authService.validateHuman(token);

    if (!isHuman) {
      throw new ForbiddenException('You are a robot!');
    }

    const resetPasswordToken = crypto.randomBytes(32).toString('hex');

    const { uuid, name } = await this.prisma.user.findUniqueOrThrow({
      where: { email },
    });

    this.redis.set(resetPasswordToken, uuid, 'EX', ttl24h);

    const resetPasswordLink = `${WEBAPP_URL}/reset-password?token=${resetPasswordToken}`;

    await this.authService.sendEmailWithResetPasswordLink(email, name, resetPasswordLink);

    return {
      success: true,
    };
  }

  async setNewPassword(setNewPasswordInput: SetNewPasswordInput): Promise<SetNewPassword> {
    const { resetToken, token, password: newPassword } = setNewPasswordInput;

    const isHuman = await this.authService.validateHuman(token);

    if (!isHuman) {
      throw new ForbiddenException('You are a robot!');
    }

    const uuid = await this.redis.get(resetToken);

    const { password: currentPassword } = await this.prisma.user.findUniqueOrThrow({
      where: {
        uuid,
      },
    });

    const isPasswordsMatches = await bcrypt.compare(newPassword, currentPassword);

    if (isPasswordsMatches)
      throw new ForbiddenException('The new password must be different from the previous one.');

    await this.redis.del(resetToken);

    await this.prisma.user.update({
      where: {
        uuid,
      },
      data: {
        password: await this.authService.hashData(newPassword),
      },
    });

    return {
      success: true,
    };
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { WEBAPP_URL } from '@common/constants/common';
import { PrismaService } from '@app/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { AuthService } from '../auth.service';
import { ResetPassword, SetNewPassword } from '../entities';
import { ResetPasswordInput, SetNewPasswordInput } from '../inputs';

@Injectable()
export class PasswordService {
  constructor(private authService: AuthService, private prisma: PrismaService) {}

  async resetPassword(resetPasswordInput: ResetPasswordInput): Promise<ResetPassword> {
    const { email, token } = resetPasswordInput;

    const isHuman = await this.authService.validateHuman(token);

    if (!isHuman) {
      throw new ForbiddenException('You are a robot!');
    }

    const resetPasswordToken = crypto.randomBytes(32).toString('hex');

    const { name } = await this.prisma.user
      .update({
        where: { email },
        data: {
          resetPasswordToken,
        },
      })
      .catch(() => {
        throw new ForbiddenException('Email not found.');
      });

    const resetPasswordLink = `${WEBAPP_URL}/reset-password?token=${resetPasswordToken}`;

    await this.authService.sendEmailWithResetPasswordLink(email, name, resetPasswordLink);

    return {
      success: true,
    };
  }

  async setNewPassword(setNewPasswordInput: SetNewPasswordInput): Promise<SetNewPassword> {
    const { resetToken, token, password } = setNewPasswordInput;

    const isHuman = await this.authService.validateHuman(token);

    if (!isHuman) {
      throw new ForbiddenException('You are a robot!');
    }

    const { password: hashedPassword } = await this.prisma.user.findUnique({
      where: { resetPasswordToken: resetToken },
    });

    const isPasswordsMatches = await bcrypt.compare(password, hashedPassword);

    if (isPasswordsMatches)
      throw new ForbiddenException('The new password must be different from the previous one.');

    await this.prisma.user
      .update({
        where: {
          resetPasswordToken: resetToken,
        },
        data: {
          password: await this.authService.hashData(password),
          resetPasswordToken: null,
        },
      })
      .catch(() => {
        throw new ForbiddenException('Invalid token.');
      });

    return {
      success: true,
    };
  }
}

import { IS_DEVELOPMENT } from '@app/common/config/env';
import { COOKIE_NAMES, EXPIRES } from '@app/common/constants/cookies';
import { PrismaService } from '@app/prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { Response } from 'express';
import { AuthService } from '../auth.service';
import { Refresh } from '../entities';

@Injectable()
export class TokenService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async refreshToken(userId: string, rt: string, res: Response): Promise<Refresh> {
    const user = await this.prisma.user.findUnique({
      where: { uuid: userId },
      select: {
        sessions: true,
        uuid: true,
        email: true,
        confirmationCodeHash: true,
      },
    });

    if (!user || !user.sessions.length) throw new ForbiddenException();

    if (user.confirmationCodeHash) {
      throw new ForbiddenException('User not confirmed.');
    }

    const rtMatch = user.sessions.find(async ({ rtHash }) => await bcrypt.compare(rt, rtHash));

    if (!rtMatch) throw new ForbiddenException();

    const { accessToken, refreshToken } = await this.authService.getTokens(user.uuid, user.email);

    await this.authService.updateSession(user.uuid, refreshToken, rtMatch.rtHash);

    res.cookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
      maxAge: EXPIRES['15MIN'],
      secure: !IS_DEVELOPMENT,
      httpOnly: true,
    });

    res.cookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
      maxAge: EXPIRES['15DAYS'],
      secure: !IS_DEVELOPMENT,
      httpOnly: true,
    });

    res.cookie(COOKIE_NAMES.IS_LOGGED_IN, true, {
      maxAge: EXPIRES['15DAYS'],
    });

    return {
      success: true,
    };
  }
}

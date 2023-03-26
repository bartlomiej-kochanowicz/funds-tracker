import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import bcrypt from 'bcrypt';
import UAParser from 'ua-parser-js';
import { IS_DEVELOPMENT, IS_TEST } from '@common/config/env';
import { catchError, firstValueFrom } from 'rxjs';
import { PrismaService } from '@app/prisma/prisma.service';
import { EXPIRES } from '@common/constants/cookies';
import { SendGridService } from '@app/send-grid/send-grid.service';
import emailConfirmationHbs from '@common/handlebars/email-confirmation.hbs';
import resetPasswordHbs from '@common/handlebars/reset-password.hbs';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
    private config: ConfigService,
    private readonly sendgridService: SendGridService,
  ) {}

  async sendEmailWithConfirmCode(email: string, uuid: string, code: string): Promise<void> {
    const mail = {
      to: email,
      subject: 'Your Funds Tracker confirmation code',
      from: 'noreply@funds-tracker.com',
      html: this.sendgridService.getHtml(emailConfirmationHbs, {
        email,
        code,
        uuid,
      }),
    };

    await this.sendgridService.send(mail);
  }

  async sendEmailWithResetPasswordLink(
    email: string,
    name: string,
    resetPasswordLink: string,
  ): Promise<void> {
    const mail = {
      to: email,
      subject: 'Funds Tracker - reset password',
      from: 'noreply@funds-tracker.com',
      html: this.sendgridService.getHtml(resetPasswordHbs, {
        name,
        email,
        resetPasswordLink,
      }),
    };

    await this.sendgridService.send(mail);
  }

  async addSession(userId: string, newRt: string, name: string): Promise<void> {
    const sessionsLength = await this.prisma.session.count({ where: { userUuid: userId } });

    if (sessionsLength >= 10) {
      const oldestSession = await this.prisma.session.findFirst({
        where: { userUuid: userId },
        orderBy: { updatedAt: 'asc' },
      });

      await this.prisma.session.deleteMany({
        where: { rtHash: oldestSession.rtHash },
      });
    }

    const isSessionExist = await this.prisma.session.findFirst({
      where: { name, userUuid: userId },
    });

    if (isSessionExist) {
      await this.updateSession(userId, newRt, isSessionExist.rtHash);

      return;
    }

    const rtHash = await this.hashData(newRt);

    await this.prisma.session.create({
      data: {
        User: {
          connect: {
            uuid: userId,
          },
        },
        name,
        rtHash,
      },
    });
  }

  async updateSession(userId: string, newRt: string, oldRtHash: string) {
    const rtHash = await this.hashData(newRt);

    await this.prisma.session.updateMany({
      where: { rtHash: oldRtHash },
      data: {
        rtHash,
      },
    });
  }

  genereteIpName(res: Response): string {
    const userAgent = res.req.headers['user-agent'];
    const parser = new UAParser(userAgent);

    const parserResults = parser.getResult();

    const { ip } = res.req;

    const userAgentPropertiesExist = parserResults.os.name && parserResults.browser.name;

    const name = `${parserResults.os.name}-${parserResults.browser.name}`;

    return `${ip}-${userAgentPropertiesExist ? name : parserResults.ua || 'unknown'}`;
  }

  async hashData(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(data, salt);
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        { expiresIn: EXPIRES['15MIN'] / 1000, secret: this.config.get('AT_SECRET') },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        { expiresIn: EXPIRES['15DAYS'] / 1000, secret: this.config.get('RT_SECRET') },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  generateConfirmationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async validateHuman(token: string): Promise<boolean> {
    if (IS_TEST || IS_DEVELOPMENT) {
      return true;
    }

    const { data } = await firstValueFrom(
      this.httpService
        .post('https://www.google.com/recaptcha/api/siteverify', null, {
          params: {
            secret: this.config.get('RECAPTCHA_SECRET'),
            response: token,
          },
        })
        .pipe(
          catchError(() => {
            throw Error('Google reCAPTCHA error.');
          }),
        ),
    );

    return data.success;
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as UAParser from 'ua-parser-js';
import { IS_DEVELOPMENT, IS_TEST } from 'common/config/env';
import { catchError, firstValueFrom } from 'rxjs';
import { PrismaService } from 'prisma/prisma.service';
import { EXPIRES, COOKIE_NAMES } from 'common/constants/cookies';
import { SendGridService } from 'send-grid/send-grid.service';
import emailConfirmationHbs from 'common/handlebars/email-confirmation.hbs';
import { Tokens } from './types';
import { ConfirmSignupInput, EmailInput, SigninInput, SignupInput } from './inputs';
import { Email, Logout, Refresh, Signup, User } from './entities';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
    private config: ConfigService,
    private readonly sendgridService: SendGridService,
  ) {}

  async signupLocal(signupInput: SignupInput): Promise<Signup> {
    const { email, password, name, token } = signupInput;

    const isHuman = await this.validateHuman(token);

    if (!isHuman) {
      throw new ForbiddenException('You are a robot!');
    }

    const hashedPwd = await this.hashData(password);

    const existedUser = await this.prisma.user.findUnique({ where: { email } });

    if (existedUser) {
      throw new ForbiddenException('Email already in use.');
    }

    const confirmationCode = this.generateConfirmationCode();

    const hashedConfirmationCode = await this.hashData(confirmationCode);

    const { uuid } = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPwd,
        confirmationCodeHash: hashedConfirmationCode,
      },
    });

    const mail = {
      to: email,
      subject: 'Your Funds Tracker confirmation code',
      from: 'noreply@funds-tracker.com',
      html: this.sendgridService.getHtml(emailConfirmationHbs, {
        email,
        code: confirmationCode,
        uuid,
      }),
    };

    const success = IS_TEST || (await this.sendgridService.send(mail));

    return {
      success,
    };
  }

  async confirmSignup(confirmSignupInput: ConfirmSignupInput, res: Response): Promise<User> {
    const { code, email, token } = confirmSignupInput;

    const isHuman = await this.validateHuman(token);

    if (!isHuman) {
      throw new ForbiddenException('You are a robot!');
    }

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new ForbiddenException('User not found.');
    }

    if (!user.confirmationCodeHash) {
      throw new ForbiddenException('User already confirmed.');
    }

    // allways pass for tests enviroment
    const isPasswordsMatches = IS_TEST || (await bcrypt.compare(code, user.confirmationCodeHash));

    if (!isPasswordsMatches) {
      throw new ForbiddenException('Wrong confirmation code.');
    }

    await this.prisma.user.update({
      where: { uuid: user.uuid },
      data: { confirmationCodeHash: null },
    });

    const { accessToken, refreshToken } = await this.getTokens(user.uuid, user.email);

    await this.addSession(user.uuid, refreshToken, this.genereteIpName(res));

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

    return user;
  }

  async signinLocal(signinInput: SigninInput, res: Response): Promise<User> {
    const { email, password, token } = signinInput;

    const isHuman = await this.validateHuman(token);

    if (!isHuman) {
      throw new ForbiddenException('You are a robot!');
    }

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new ForbiddenException('Wrong credencials provided.');

    const isPasswordsMatches = await bcrypt.compare(password, user.password);

    if (!isPasswordsMatches) throw new ForbiddenException('Wrong password.');

    const { accessToken, refreshToken } = await this.getTokens(user.uuid, user.email);

    await this.addSession(user.uuid, refreshToken, this.genereteIpName(res));

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

    return user;
  }

  async signinLocalForTests(
    uuid: string,
    sessionName: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.prisma.user.findUnique({ where: { uuid } });

    const { accessToken, refreshToken } = await this.getTokens(user.uuid, user.email);

    await this.addSession(user.uuid, refreshToken, sessionName);

    return {
      accessToken,
      refreshToken,
    };
  }

  async checkEmail(emailInput: EmailInput): Promise<Email> {
    const { email, token } = emailInput;

    const isHuman = await this.validateHuman(token);

    if (!isHuman) {
      throw new ForbiddenException('You are a robot!');
    }

    const user = await this.prisma.user.findUnique({ where: { email } });

    return {
      exist: Boolean(user),
    };
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { uuid: userId },
    });

    return user;
  }

  async logout(userId: string, res: Response): Promise<Logout> {
    try {
      const userSessions = await this.prisma.session.findMany({
        where: { userUuid: userId },
      });

      const session = userSessions.find(
        async ({ rtHash }) => await bcrypt.compare(res.req.cookies.refreshToken, rtHash),
      );

      await this.prisma.session.deleteMany({
        where: { rtHash: session.rtHash },
      });

      res.clearCookie(COOKIE_NAMES.ACCESS_TOKEN, {
        secure: !IS_DEVELOPMENT,
        httpOnly: true,
      });

      res.clearCookie(COOKIE_NAMES.REFRESH_TOKEN, {
        secure: !IS_DEVELOPMENT,
        httpOnly: true,
      });

      res.clearCookie(COOKIE_NAMES.IS_LOGGED_IN);

      return {
        success: true,
      };
    } catch {
      return {
        success: false,
      };
    }
  }

  async refreshToken(userId: string, rt: string, res: Response): Promise<Refresh> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { uuid: userId },
        select: {
          sessions: true,
          uuid: true,
          email: true,
        },
      });

      if (!user || !user.sessions.length) throw new ForbiddenException();

      const rtMatch = user.sessions.find(async ({ rtHash }) => await bcrypt.compare(rt, rtHash));

      if (!rtMatch) throw new ForbiddenException();

      const { accessToken, refreshToken } = await this.getTokens(user.uuid, user.email);

      await this.updateSession(user.uuid, refreshToken, rtMatch.rtHash);

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
    } catch {
      return {
        success: false,
      };
    }
  }

  private async addSession(userId: string, newRt: string, name: string): Promise<void> {
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

  private async updateSession(userId: string, newRt: string, oldRtHash: string) {
    const rtHash = await this.hashData(newRt);

    await this.prisma.session.updateMany({
      where: { rtHash: oldRtHash },
      data: {
        rtHash,
      },
    });
  }

  private genereteIpName(res: Response): string {
    const userAgent = res.req.headers['user-agent'];
    const parser = new UAParser(userAgent);

    const parserResults = parser.getResult();

    const { ip } = res.req;

    const userAgentPropertiesExist = parserResults.os.name && parserResults.browser.name;

    const name = `${parserResults.os.name}-${parserResults.browser.name}`;

    return `${ip}-${userAgentPropertiesExist ? name : parserResults.ua || 'unknown'}`;
  }

  private async hashData(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(data, salt);
  }

  private async getTokens(userId: string, email: string): Promise<Tokens> {
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

  private generateConfirmationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private async validateHuman(token: string): Promise<boolean> {
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

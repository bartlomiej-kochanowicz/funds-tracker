import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { IS_DEVELOPMENT, IS_TEST } from 'common/config/env';
import { catchError, firstValueFrom } from 'rxjs';
import { PrismaService } from 'prisma/prisma.service';
import { EXPIRES, COOKIE_NAMES } from 'common/constants/cookies';
import * as UAParser from 'ua-parser-js';
import { Tokens } from './types';
import { EmailInput, SigninInput, SignupInput } from './inputs';
import { Email, Logout, Refresh, User } from './entities';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
    private config: ConfigService,
  ) {}

  async signupLocal(signupInput: SignupInput, res?: Response): Promise<User> {
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

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPwd,
      },
      select: {
        uuid: true,
        email: true,
        name: true,
        createdAt: true,
        devices: {
          select: {
            name: true,
            rtHash: true,
            updatedAt: true,
          },
        },
      },
    });

    const { accessToken, refreshToken } = await this.getTokens(user.uuid, user.email);

    await this.addDevice(user.uuid, refreshToken, this.genereteIpName(res));

    if (res) {
      res.cookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
        maxAge: EXPIRES['15MIN'],
        secure: !IS_DEVELOPMENT,
        httpOnly: true,
      });

      res.cookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
        maxAge: EXPIRES['30days'],
        secure: !IS_DEVELOPMENT,
        httpOnly: true,
      });

      res.cookie(COOKIE_NAMES.IS_LOGGED_IN, true, {
        maxAge: EXPIRES['30days'],
      });
    }

    return user;
  }

  async signinLocal(signinInput: SigninInput, res: Response): Promise<User> {
    const { email, password, token } = signinInput;

    const isHuman = await this.validateHuman(token);

    if (!isHuman) {
      throw new ForbiddenException('You are a robot!');
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        uuid: true,
        email: true,
        name: true,
        createdAt: true,
        devices: {
          select: {
            name: true,
            rtHash: true,
            updatedAt: true,
          },
        },
        password: true,
      },
    });

    if (!user) throw new ForbiddenException('Wrong credencials provided.');

    const isPasswordsMatches = await bcrypt.compare(password, user.password);

    if (!isPasswordsMatches) throw new ForbiddenException('Wrong password.');

    const { accessToken, refreshToken } = await this.getTokens(user.uuid, user.email);

    await this.addDevice(user.uuid, refreshToken, this.genereteIpName(res));

    res.cookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
      maxAge: EXPIRES['15MIN'],
      secure: !IS_DEVELOPMENT,
      httpOnly: true,
    });

    res.cookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
      maxAge: EXPIRES['30days'],
      secure: !IS_DEVELOPMENT,
      httpOnly: true,
    });

    res.cookie(COOKIE_NAMES.IS_LOGGED_IN, true, {
      maxAge: EXPIRES['30days'],
    });

    return user;
  }

  async signinLocalForTests(uuid: string): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.prisma.user.findUnique({ where: { uuid } });

    const { accessToken, refreshToken } = await this.getTokens(user.uuid, user.email);

    await this.addDevice(user.uuid, refreshToken, 'test-device');

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

  async getAccount(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { uuid: userId },
      select: {
        uuid: true,
        email: true,
        name: true,
        createdAt: true,
        devices: {
          select: {
            name: true,
            rtHash: true,
            updatedAt: true,
          },
        },
      },
    });

    return user;
  }

  async logout(userId: string, res: Response): Promise<Logout> {
    try {
      await this.prisma.device.deleteMany({
        where: { name: this.genereteIpName(res), rtHash: res.req.cookies.refreshToken },
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
          devices: true,
          uuid: true,
          email: true,
        },
      });

      if (!user || !user.devices.length) throw new ForbiddenException();

      const isRtMatches = Boolean(
        user.devices.filter(async ({ rtHash }) => await bcrypt.compare(rt, rtHash)),
      );

      if (!isRtMatches) throw new ForbiddenException();

      const { accessToken, refreshToken } = await this.getTokens(user.uuid, user.email);

      await this.updateDevice(user.uuid, refreshToken, res.req.cookies.refreshToken);

      res.cookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
        maxAge: EXPIRES['15MIN'],
        secure: !IS_DEVELOPMENT,
        httpOnly: true,
      });

      res.cookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
        maxAge: EXPIRES['30days'],
        secure: !IS_DEVELOPMENT,
        httpOnly: true,
      });

      res.cookie(COOKIE_NAMES.IS_LOGGED_IN, true, {
        maxAge: EXPIRES['30days'],
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

  private genereteIpName(res: Response): string {
    const userAgent = res.req.headers['user-agent'];
    const parser = new UAParser(userAgent);

    const parserResults = parser.getResult();

    const { ip } = res.req;

    const userAgentPropertiesExist = parserResults.os.name && parserResults.browser.name;

    const name = `${parserResults.os.name}-${parserResults.browser.name}`;

    return `${ip}-${userAgentPropertiesExist ? name : parserResults.ua}`;
  }

  private async addDevice(userId: string, newRt: string, name?: string): Promise<void> {
    const devicesLength = await this.prisma.device.count({ where: { userUuid: userId } });

    if (devicesLength >= 10) {
      const oldestDevice = await this.prisma.device.findFirst({
        where: { userUuid: userId },
        orderBy: { updatedAt: 'asc' },
      });

      await this.prisma.device.deleteMany({
        where: { rtHash: oldestDevice.rtHash },
      });
    }

    const isDeviceExist = await this.prisma.device.findFirst({
      where: { name },
    });

    if (isDeviceExist) {
      await this.updateDevice(userId, newRt, isDeviceExist.rtHash);

      return;
    }

    const rtHash = await this.hashData(newRt);

    await this.prisma.device.create({
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

  private async updateDevice(userId: string, newRt: string, oldRtHash: string) {
    const rtHash = await this.hashData(newRt);

    await this.prisma.device.updateMany({
      where: { rtHash: oldRtHash },
      data: {
        rtHash,
      },
    });
  }

  private async hashData(pwd: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(pwd, salt);
  }

  private async getTokens(userId: string, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        { expiresIn: 60 * 15, secret: this.config.get('AT_SECRET') }, // 15 minutes
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        { expiresIn: 60 * 60 * 24 * 30, secret: this.config.get('RT_SECRET') }, // 30 days
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
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

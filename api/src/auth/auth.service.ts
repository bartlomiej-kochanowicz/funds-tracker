import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { IS_DEVELOPMENT } from 'common/config/env';
import { catchError, firstValueFrom } from 'rxjs';
import { PrismaService } from 'prisma/prisma.service';
import { EXPIRES, COOKIE_NAMES } from 'common/constants/cookies';
import { Tokens } from './types';
import { SigninInput, SignupInput } from './inputs';
import { User } from './entities';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
    private config: ConfigService,
  ) {}

  async signupLocal(signupInput: SignupInput, res: Response): Promise<User> {
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
    });

    const { accessToken, refreshToken } = await this.getTokens(
      user.uuid,
      user.email,
    );

    await this.updateRtHash(user.uuid, refreshToken);

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

  async signinLocal(signinInput: SigninInput, res: Response): Promise<User> {
    const { email, password, token } = signinInput;

    const isHuman = await this.validateHuman(token);

    if (!isHuman) {
      throw new ForbiddenException('You are a robot!');
    }

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new ForbiddenException('No account for these email.');

    const isPasswordsMatches = await bcrypt.compare(password, user.password);

    if (!isPasswordsMatches) throw new ForbiddenException('Wrong password.');

    const { accessToken, refreshToken } = await this.getTokens(
      user.uuid,
      user.email,
    );

    await this.updateRtHash(user.uuid, refreshToken);

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

  /*

  async checkEmail(dto: EmailDto): Promise<{ exist: boolean }> {
    const { email, token } = dto;

    const isHuman = await this.validateHuman(token);

    if (!isHuman) {
      throw new ForbiddenException('You are a robot!');
    }

    const user = await this.prisma.user.findUnique({ where: { email } });

    return {
      exist: Boolean(user),
    };
  } */

  async getAccount(
    userId: string,
  ): Promise<Pick<User, 'email' | 'uuid' | 'createdAt' | 'name'>> {
    const { email, uuid, createdAt, name } = await this.prisma.user.findUnique({
      where: { uuid: userId },
    });

    return { email, uuid, createdAt, name };
  }

  async logout(userId: string, res): Promise<unknown> {
    try {
      await this.prisma.user.updateMany({
        where: {
          uuid: userId,
          rtHash: {
            not: null,
          },
        },
        data: {
          rtHash: null,
        },
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

      return res.status(200).send();
    } catch (error) {
      return res.json(error);
    }
  }

  async refreshToken(
    userId: string,
    rt: string,
    res: Response,
  ): Promise<unknown> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { uuid: userId },
      });

      if (!user || !user.rtHash) throw new ForbiddenException();

      const isRtMatches = await bcrypt.compare(rt, user.rtHash);

      if (!isRtMatches) throw new ForbiddenException();

      const { accessToken, refreshToken } = await this.getTokens(
        user.uuid,
        user.email,
      );

      await this.updateRtHash(user.uuid, refreshToken);

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

      return res.status(200).send();
    } catch (error) {
      delete error.response;

      return res.json(error);
    }
  }

  private async updateRtHash(userId: string, rt: string) {
    const rtHash = await this.hashData(rt);

    await this.prisma.user.update({
      where: { uuid: userId },
      data: { rtHash },
    });
  }

  private async hashData(pwd: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    console.log({ pwd, salt });

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
        { expiresIn: 60 * 60 * 24 * 7, secret: this.config.get('RT_SECRET') }, // 7 days
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  private async validateHuman(token: string): Promise<boolean> {
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

    return IS_DEVELOPMENT ? true : data.success;
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AT_SECRET, IS_DEVELOPMENT, RT_SECRET } from 'common/config/env';
import { PrismaService } from 'prisma/prisma.service';
import { EXPIRES, COOKIE_NAMES } from 'common/constants/cookies';
import { SignupDto, SigninDto, EmailDto } from './dto';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signupLocal(dto: SignupDto, res: Response): Promise<unknown> {
    try {
      const { email, password, name } = dto;

      const hashedPwd = await this.hashData(password);

      const user = await this.prisma.user.findUnique({ where: { email } });

      if (user) {
        throw new ForbiddenException('Email already in use.');
      }

      const { uuid: newUserId, email: newUserEmail } =
        await this.prisma.user.create({
          data: {
            email,
            name,
            password: hashedPwd,
          },
        });

      const { accessToken, refreshToken } = await this.getTokens(
        newUserId,
        newUserEmail,
      );

      await this.updateRtHash(newUserId, refreshToken);

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

      return res.status(201).send();
    } catch (error) {
      delete error.response;

      return res.json(error);
    }
  }

  async signinLocal(
    dto: SigninDto,
    res: Response,
  ): Promise<Response<Pick<User, 'uuid' | 'email'>>> {
    try {
      const { email, password } = dto;

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

      return res.status(200).send();
    } catch (error) {
      delete error.response;

      return res.json(error);
    }
  }

  async checkEmail(dto: EmailDto): Promise<{ exist: boolean }> {
    const { email } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    return {
      exist: Boolean(user),
    };
  }

  async getAccount(
    userId: string,
  ): Promise<Pick<User, 'email' | 'uuid' | 'createdAt'>> {
    const { email, uuid, createdAt } = await this.prisma.user.findUnique({
      where: { uuid: userId },
    });

    return { email, uuid, createdAt };
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

    return bcrypt.hash(pwd, salt);
  }

  private async getTokens(userId: string, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        { expiresIn: 60 * 15, secret: AT_SECRET }, // 15 minutes
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        { expiresIn: 60 * 60 * 24 * 7, secret: RT_SECRET }, // 7 days
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}

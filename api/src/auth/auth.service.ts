import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AT_SECRET, IS_DEVELOPMENT, RT_SECRET } from 'common/config/env';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { AuthDto, EmailDto } from './dto';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signupLocal(dto: AuthDto, res: Response): Promise<unknown> {
    try {
      const { email, password } = dto;

      const hashedPwd = await this.hashData(password);

      const user = await this.prisma.user.findUnique({ where: { email } });

      if (user) {
        throw new ForbiddenException('Email already in use.');
      }

      const { uuid: newUserId, email: newUserEmail } =
        await this.prisma.user.create({
          data: {
            email,
            password: hashedPwd,
          },
        });

      const { accessToken, refreshToken } = await this.getTokens(
        newUserId,
        newUserEmail,
      );

      await this.updateRtHash(newUserId, refreshToken);

      res.cookie('accessToken', accessToken, {
        expires: new Date(new Date().getTime() + 15 * 60000), // 15 minutes
        secure: !IS_DEVELOPMENT,
        httpOnly: true,
      });

      res.cookie('refreshToken', refreshToken, {
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60000), // 7 days
        secure: !IS_DEVELOPMENT,
        httpOnly: true,
      });

      return res.status(201).send();
    } catch (error) {
      return res.json(error);
    }
  }

  async signinLocal(
    dto: AuthDto,
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

      res.cookie('accessToken', accessToken, {
        expires: new Date(new Date().getTime() + 2 * 60000), // 2 minutes
        // expires: new Date(new Date().getTime() + 15 * 60000), // 15 minutes
        secure: !IS_DEVELOPMENT,
        httpOnly: true,
      });

      res.cookie('refreshToken', refreshToken, {
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60000), // 7 days
        secure: !IS_DEVELOPMENT,
        httpOnly: true,
      });

      return res.json({ uuid: user.uuid, email: user.email }).send();
    } catch (error) {
      return res.json(error);
    }
  }

  async checkEmailExist(dto: EmailDto): Promise<void> {
    const { email } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new ForbiddenException('No account for these email.');
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

      res.clearCookie('accessToken', {
        secure: !IS_DEVELOPMENT,
        httpOnly: true,
      });

      res.clearCookie('refreshToken', {
        secure: !IS_DEVELOPMENT,
        httpOnly: true,
      });

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

      res.cookie('accessToken', accessToken, {
        expires: new Date(new Date().getTime() + 2 * 60000), // 2 minutes
        // expires: new Date(new Date().getTime() + 15 * 60000), // 15 minutes
        secure: !IS_DEVELOPMENT,
        httpOnly: true,
      });

      res.cookie('refreshToken', refreshToken, {
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60000), // 7 days
        secure: !IS_DEVELOPMENT,
        httpOnly: true,
      });

      return res.status(200).send();
    } catch (error) {
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
        { expiresIn: 60 * 2, secret: AT_SECRET }, // 2 minutes
        // { expiresIn: 60 * 15, secret: AT_SECRET }, // 15 minutes
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

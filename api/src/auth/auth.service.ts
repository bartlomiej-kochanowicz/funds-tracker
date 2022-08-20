import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AT_SECRET, RT_SECRET } from 'common/config/env';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { AuthDto, EmailDto } from './dto';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signupLocal(dto: AuthDto): Promise<Tokens> {
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

    const tokens = await this.getTokens(newUserId, newUserEmail);

    await this.updateRtHash(newUserId, tokens.refreshToken);

    return tokens;
  }

  async signinLocal(
    dto: AuthDto,
  ): Promise<Tokens & Pick<User, 'uuid' | 'email'>> {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new ForbiddenException('No account for these email.');

    const isPasswordsMatches = await bcrypt.compare(user.password, password);

    if (isPasswordsMatches) throw new ForbiddenException('Wrong password.');

    const tokens = await this.getTokens(user.uuid, user.email);

    await this.updateRtHash(user.uuid, tokens.refreshToken);

    return { ...tokens, uuid: user.uuid, email: user.email };
  }

  async checkEmailExist(dto: EmailDto): Promise<void> {
    const { email } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new ForbiddenException('No account for these email.');
  }

  async logout(userId: string): Promise<void> {
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
  }

  async refreshToken(userId: string, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({ where: { uuid: userId } });

    if (!user || !user.rtHash) throw new ForbiddenException();

    const isRtMatches = await bcrypt.compare(user.rtHash, rt);

    if (!isRtMatches) throw new ForbiddenException();

    const tokens = await this.getTokens(user.uuid, user.email);

    await this.updateRtHash(user.uuid, tokens.refreshToken);

    return tokens;
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
        { expiresIn: 60 * 15, secret: AT_SECRET },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        { expiresIn: 60 * 60 * 24 * 7, secret: RT_SECRET },
      ),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}

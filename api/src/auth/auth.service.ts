import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AT_SECRET, RT_SECRET } from 'common/config/env';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto';
import { Tokens } from './types/tokens.type';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const { email, password } = dto;

    const hashedPwd = await this.hashData(password);

    const { id: newUserId, email: newUserEmail } =
      await this.prisma.user.create({
        data: {
          email,
          password: hashedPwd,
        },
      });

    const tokens = await this.getTokens(newUserId, newUserEmail);

    await this.updateRtHash(newUserId, tokens.refresh_token);

    return tokens;
  }

  signinLocal() {}

  logout() {}

  refreshToken() {}

  private async updateRtHash(userId: string, rt: string) {
    const rtHash = await this.hashData(rt);

    await this.prisma.user.update({
      where: { id: userId },
      data: { rtHash },
    });
  }

  private hashData(pwd: string): Promise<string> {
    return bcrypt.hash(pwd, 10);
  }

  private async getTokens(userId: string, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        { expiresIn: 60 * 15, secret: AT_SECRET },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        { expiresIn: 60 * 60 * 60 * 7, secret: RT_SECRET },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}

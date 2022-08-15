import { Injectable } from '@nestjs/common';
// import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { AT_SECRET, RT_SECRET } from 'common/config/env';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  private hashPwd(pwd: string): Promise<string> {
    return bcrypt.hash(pwd, 10);
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
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

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    const { email, password } = dto;

    const hashedPwd = await this.hashPwd(password);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPwd,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);

    return tokens;
  }

  signinLocal() {}

  logout() {}

  refreshToken() {}
}

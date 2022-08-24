import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'auth/types';
import { AT_SECRET } from 'common/config/env';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies.accessToken;

          if (!data) {
            return null;
          }

          return data;
        },
      ]),
      secretOrKey: AT_SECRET,
    });
  }

  validate(payload: JwtPayload) {
    if (payload === null) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}

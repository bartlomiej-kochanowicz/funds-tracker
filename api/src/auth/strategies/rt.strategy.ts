import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { RT_SECRET } from 'common/config/env';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies.refreshToken;

          if (!data) {
            return null;
          }

          return data;
        },
      ]),
      secretOrKey: RT_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    return { ...payload, refreshToken: req.cookies.refreshToken };
  }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AT_SECRET } from 'common/config/env';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: AT_SECRET,
    });
  }

  validate(payload: any) {
    return payload;
  }
}

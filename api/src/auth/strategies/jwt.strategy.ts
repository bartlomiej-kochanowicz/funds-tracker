import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'auth/interfaces/jwt';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret-test-test-TODO',
    });
  }

  async validate(payload: JwtPayload, done: (error, user) => void) {
    if (!payload?.id) {
      return done(new UnauthorizedException(), null);
    }

    const user = await this.userService.findById(payload?.id);

    if (!user) {
      return done(new UnauthorizedException(), null);
    }

    return done(null, user);
  }
}

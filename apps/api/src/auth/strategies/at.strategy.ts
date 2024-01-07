import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "@app/auth/types";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(@Inject(ConfigService) config: ConfigService) {
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
			secretOrKey: config.get("AT_SECRET"),
		});
	}

	validate(payload: JwtPayload) {
		if (payload === null) {
			throw new UnauthorizedException();
		}

		return payload;
	}
}

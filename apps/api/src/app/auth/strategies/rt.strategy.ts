import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
	constructor(@Inject(ConfigService) config: ConfigService) {
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
			secretOrKey: config.get("RT_SECRET"),
			passReqToCallback: true,
		});
	}

	validate(req: Request, payload: any) {
		return { ...payload, refreshToken: req.cookies.refreshToken };
	}
}

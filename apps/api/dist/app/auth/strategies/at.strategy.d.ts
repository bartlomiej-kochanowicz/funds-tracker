import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "@app/auth/types";
import { Strategy } from "passport-jwt";
declare const AtStrategy_base: new (...args: any[]) => Strategy;
export declare class AtStrategy extends AtStrategy_base {
    constructor(config: ConfigService);
    validate(payload: JwtPayload): JwtPayload;
}
export {};

import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
import { Request } from "express";
declare const RtStrategy_base: new (...args: any[]) => Strategy;
export declare class RtStrategy extends RtStrategy_base {
    constructor(config: ConfigService);
    validate(req: Request, payload: any): any;
}
export {};

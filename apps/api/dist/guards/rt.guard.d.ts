import { ExecutionContext } from "@nestjs/common";
declare const RtGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class RtGuard extends RtGuard_base {
    constructor();
    getRequest(context: ExecutionContext): any;
}
export {};

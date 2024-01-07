import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

export class RtGuard extends AuthGuard("jwt-refresh") {
	constructor() {
		super();
	}

	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req;
	}
}

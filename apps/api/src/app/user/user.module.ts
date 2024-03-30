import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";

@Module({
	providers: [UserResolver, UserService],
	exports: [UserService],
})
export class UserModule {}

import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { HttpModule } from "@nestjs/axios";
import { SendGridModule } from "@app/send-grid/send-grid.module";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { AtStrategy, RtStrategy } from "./strategies";
import { SignupService } from "./services/signup.service";
import { SigninService } from "./services/signin.service";
import { LogoutService } from "./services/logout.service";
import { PasswordService } from "./services/password.service";
import { TokenService } from "./services/token.service";

@Module({
	imports: [JwtModule.register({}), HttpModule, SendGridModule],
	providers: [
		AuthResolver,
		AuthService,
		SignupService,
		SigninService,
		LogoutService,
		PasswordService,
		TokenService,
		AtStrategy,
		RtStrategy,
	],
})
export class AuthModule {}

import { Controller, Get } from "@nestjs/common";
import { Public } from "@decorators/public.decorator";

@Controller("health-check")
export class HealthCheckController {
	@Get()
	@Public()
	check() {
		return "OK"; // Simply returns "OK" when the app is running
	}
}

import { Test, TestingModule } from "@nestjs/testing";
import { SendGridService } from "./send-grid.service";

describe.skip("SendGridService", () => {
	let service: SendGridService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SendGridService],
		}).compile();

		service = module.get<SendGridService>(SendGridService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});

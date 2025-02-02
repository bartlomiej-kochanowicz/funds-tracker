import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { withPulse } from "@prisma/extension-pulse";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	async onModuleInit() {
		const apiKey = process.env.PULSE_API_KEY;

		if (apiKey) {
			await this.$extends(withPulse({ apiKey: process.env.PULSE_API_KEY })).$connect();
		} else {
			await this.$connect();
		}
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}

	async cleanDatabase() {
		await Promise.all([
			await this.session.deleteMany(),
			await this.securityActivity.deleteMany(),
			await this.security.deleteMany(),
			await this.cashHoldingActivity.deleteMany(),
			await this.cashHolding.deleteMany(),
			await this.hardAssetActivity.deleteMany(),
			await this.hardAsset.deleteMany(),
			await this.portfolio.deleteMany(),
			await this.user.deleteMany(),
		]);
	}

	async enableShutdownHooks(app: INestApplication) {
		process.on("beforeExit", async () => {
			await app.close();
		});
	}
}

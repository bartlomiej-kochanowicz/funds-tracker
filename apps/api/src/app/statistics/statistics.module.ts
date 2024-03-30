import { Module } from "@nestjs/common";
import { StatisticsService } from "./statistics.service";
import { StatisticsResolver } from "./statistics.resolver";

@Module({
	providers: [StatisticsResolver, StatisticsService],
})
export class StatisticsModule {}

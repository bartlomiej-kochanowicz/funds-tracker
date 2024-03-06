import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { InstrumentsService } from "./instruments.service";
import { InstrumentsResolver } from "./instruments.resolver";

@Module({
	imports: [HttpModule],
	providers: [InstrumentsService, InstrumentsResolver],
})
export class InstrumentsModule {}

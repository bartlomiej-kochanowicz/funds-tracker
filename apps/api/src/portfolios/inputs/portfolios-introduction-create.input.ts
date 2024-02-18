import { Field, InputType } from "@nestjs/graphql";
import { ArrayMaxSize } from "class-validator";
import { PortfolioCreateInput } from "./portfolio-create.input";

@InputType()
export class IntroductionPortfolioCreatesInput {
	@ArrayMaxSize(10, { message: "You can create up to 10 portfolios." })
	@Field(() => [PortfolioCreateInput], { description: "Portfolios array." })
	portfolios: PortfolioCreateInput[];
}

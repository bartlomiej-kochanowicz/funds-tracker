import { InputType, Field } from "@nestjs/graphql";
import { Length } from "class-validator";

@InputType()
export class CreatePortfolioInput {
	@Length(2, 50, { message: "Name must be between 2 and 50 characters." })
	@Field(() => String, { description: "Portfolio name." }) // 2,50
	name: string;
}

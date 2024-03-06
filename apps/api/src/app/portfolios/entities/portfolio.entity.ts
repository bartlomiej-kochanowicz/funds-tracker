import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Length } from "class-validator";

@ObjectType()
export class Portfolio {
	@Field(() => ID, { description: "Portfolio uuid." })
	uuid: string;

	@Length(2, 50, { message: "Name must be between 2 and 50 characters." })
	@Field(() => String, { description: "Portfolio name." })
	name: string;
}

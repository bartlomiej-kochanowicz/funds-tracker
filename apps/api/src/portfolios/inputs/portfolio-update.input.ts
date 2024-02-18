import { InputType, PartialType } from "@nestjs/graphql";
import { PortfolioCreateInput } from "./portfolio-create.input";

@InputType()
export class PortfolioUpdateInput extends PartialType(PortfolioCreateInput) {}

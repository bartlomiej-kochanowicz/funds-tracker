import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PortfolioDelete {
  @Field(() => Boolean, { description: 'Confirmatiopn delete portfolio.' })
  success: boolean;
}

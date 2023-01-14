import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CashAccounts {
  @Field(() => Boolean, { description: 'Create cash accounts success.' })
  success: boolean;
}

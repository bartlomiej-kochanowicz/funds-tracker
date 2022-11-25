import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAbcdInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

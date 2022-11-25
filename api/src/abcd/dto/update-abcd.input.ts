import { CreateAbcdInput } from './create-abcd.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAbcdInput extends PartialType(CreateAbcdInput) {
  @Field(() => Int)
  id: number;
}

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class EmailInput {
  @Field(() => String, { description: 'Email.' })
  name: string;

  @Field(() => String, { description: 'Token.' })
  token: string;
}

import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class SearchInstrumentsInput {
  @IsString()
  @Field(() => String, { description: 'Instrument name.' })
  name: string;
}

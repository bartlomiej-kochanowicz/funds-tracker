import { Instrument } from '@app/common/constants/instrument';
import { IsInstrumentType } from '@app/common/validators/InstrumentType';
import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class SearchInstrumentInput {
  @IsString()
  @Field(() => String, { description: 'Instrument name.' })
  name: string;

  @IsInstrumentType()
  @Field(() => Instrument, { description: 'Instrument type.' })
  type: keyof typeof Instrument;
}

registerEnumType(Instrument, {
  name: 'Instrument',
});

import { ObjectType, Field } from '@nestjs/graphql';
import { Device } from './device.entity';

@ObjectType()
export class User {
  @Field(() => String, { description: 'User uuid.' })
  uuid: string;

  @Field(() => Date, { description: 'User date created.' })
  createdAt: Date;

  @Field(() => String, { description: 'User email.' })
  email: string;

  @Field(() => String, { description: 'User name.' })
  name: string;

  @Field(() => [Device], { description: 'Devices list.' })
  devices: Device[];
}

import { ObjectType, Field } from '@nestjs/graphql';
import { Session } from './session.entity';

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

  @Field(() => [Session], { description: 'Sessions list.' })
  sessions: Session[];
}

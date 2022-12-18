import { ObjectType, Field } from '@nestjs/graphql';
import { Session as PrismaSession } from '@prisma/client';

@ObjectType()
export class Session {
  @Field(() => String, { description: 'Session name.' })
  name: PrismaSession['name'];

  @Field(() => String, { description: 'Refresh token hash.' })
  rtHash: PrismaSession['rtHash'];

  @Field(() => Date, { description: 'Last updated.' })
  updatedAt: PrismaSession['updatedAt'];
}

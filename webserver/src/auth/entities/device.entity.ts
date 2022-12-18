import { ObjectType, Field } from '@nestjs/graphql';
import { Device as PrismaDevice } from '@prisma/client';

@ObjectType()
export class Device {
  @Field(() => String, { description: 'Device name.' })
  name: PrismaDevice['name'];

  @Field(() => String, { description: 'Refresh token hash.' })
  rtHash: PrismaDevice['rtHash'];

  @Field(() => Date, { description: 'Last updated.' })
  updatedAt: PrismaDevice['updatedAt'];
}

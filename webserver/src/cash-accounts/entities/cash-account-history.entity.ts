import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { CashAccountHistory as CashAccountHistoryPrisma } from '@prisma/client';
import { DateResolver } from 'graphql-scalars';

@ObjectType()
export class CashAccountHistory implements Omit<CashAccountHistoryPrisma, 'cashAccountUuid'> {
  @Field(() => ID, { description: 'Transaction uuid.' })
  uuid: string;

  @Field(() => DateResolver, { description: 'Date of the transaction.' })
  date: Date;

  @Field(() => Float, { description: 'Cash account balance.' })
  balance: number;
}

import { ObjectType, Field } from '@nestjs/graphql';
import { CashAccountHistory as CashAccountHistoryPrisma } from '@prisma/client';

@ObjectType()
export class CashAccountHistory implements Omit<CashAccountHistoryPrisma, 'cashAccountUuid'> {
  @Field(() => String, { description: 'Transaction uuid.' })
  uuid: string;

  @Field(() => Date, { description: 'Date of the transaction.' })
  date: Date;

  @Field(() => Number, { description: 'Cash account balance.' })
  balance: number;
}

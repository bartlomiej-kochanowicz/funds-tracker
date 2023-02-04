import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql';
import {
  CashAccountOperation as ICashAccountOperation,
  CashAccountOperationType,
} from '@prisma/client';
import { DateResolver } from 'graphql-scalars';

@ObjectType()
export class CashAccountOperation implements Omit<ICashAccountOperation, 'cashAccountUuid'> {
  @Field(() => ID, { description: 'Transaction uuid.' })
  uuid: string;

  @Field(() => DateResolver, { description: 'Date of the transaction.' })
  date: Date;

  @Field(() => Float, { description: 'Cash account balance.' })
  amount: number;

  @Field(() => CashAccountOperationType, { description: 'Cash account oparation type.' })
  type: CashAccountOperationType;
}

registerEnumType(CashAccountOperationType, {
  name: 'CashAccountOperationType',
});

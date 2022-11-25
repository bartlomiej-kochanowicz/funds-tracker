import { Currency } from '@prisma/client';

export const allowedCurrency: Record<keyof typeof Currency, any> = Currency;

import { PartialType } from '@nestjs/mapped-types';
import { CreatePortfolioInput } from './create-portfolio.input';

export class UpdatePortfolioInput extends PartialType(CreatePortfolioInput) {}

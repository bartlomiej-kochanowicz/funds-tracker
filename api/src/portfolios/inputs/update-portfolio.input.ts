import { PartialType } from '@nestjs/mapped-types';
import { CreatePortfolioInput } from './create-portfolio.input';

export class UpdatePortfolioDto extends PartialType(CreatePortfolioInput) {}

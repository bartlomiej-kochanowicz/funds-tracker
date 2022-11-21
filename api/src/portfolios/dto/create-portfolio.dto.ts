import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  rebalancingEnabled: boolean;
}

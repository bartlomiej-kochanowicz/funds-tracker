import { IsNotEmpty, IsString } from 'class-validator';

export class EmailDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}

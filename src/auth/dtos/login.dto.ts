import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  // @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_name: string;

  // @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly first_name: string;

  @IsNotEmpty()
  readonly middle_name: string;

  @IsNotEmpty()
  readonly last_name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Exclude()
  readonly password: string;
}

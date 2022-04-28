import { IsNotEmpty } from 'class-validator';

export class CreateSubsectionDto {
  @IsNotEmpty()
  subsectionNumber: string;
  
  @IsNotEmpty()
  subsectionTitle: string;
}
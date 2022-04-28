import { IsNotEmpty } from 'class-validator';

export class CreateSectionDto {
  @IsNotEmpty()
  sectionNumber: string;
  
  @IsNotEmpty()
  sectionTitle: string;
  
  @IsNotEmpty()
  fontSize: number;
  
  @IsNotEmpty()
  fontFamily: string;

  @IsNotEmpty()
  alignment: string;

  @IsNotEmpty()
  spacing: number;

  image: boolean;

  table: boolean;
}

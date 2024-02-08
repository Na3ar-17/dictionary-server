import { IsString } from 'class-validator';

export class CreateRowDto {
  @IsString()
  word: string;

  @IsString()
  translation: string;
}

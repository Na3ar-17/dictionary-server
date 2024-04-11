import { IsOptional, IsString } from 'class-validator';

export class BookMarkDTO {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  id?: string;
}

import { IsString } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  title: string;

  @IsString()
  id?: string;
}

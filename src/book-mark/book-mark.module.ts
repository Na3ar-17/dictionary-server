import { Module } from '@nestjs/common';
import { BookMarkService } from './book-mark.service';
import { BookMarkController } from './book-mark.controller';

import { PrismaModule } from 'src/prisma/prisma.module';
import { FolderModule } from 'src/folder/folder.module';

@Module({
  controllers: [BookMarkController],
  exports: [BookMarkService],
  imports: [PrismaModule, FolderModule],
  providers: [BookMarkService],
})
export class BookMarkModule {}

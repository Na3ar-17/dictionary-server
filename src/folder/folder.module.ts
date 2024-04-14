import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatisticsService } from 'src/statistics/statistics.service';
import { RowService } from 'src/row/row.service';
import { BookMarkService } from 'src/book-mark/book-mark.service';
import { RowModule } from 'src/row/row.module';

@Module({
  controllers: [FolderController],
  providers: [
    FolderService,
    PrismaService,
    StatisticsService,
    RowService,
    BookMarkService,
  ],
})
export class FolderModule {}

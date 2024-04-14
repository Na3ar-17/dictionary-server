import { Module } from '@nestjs/common';
import { BookMarkService } from './book-mark.service';
import { BookMarkController } from './book-mark.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FolderService } from 'src/folder/folder.service';
import { RowService } from 'src/row/row.service';
import { StatisticsService } from 'src/statistics/statistics.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
  controllers: [BookMarkController],
  providers: [
    BookMarkService,
    PrismaService,
    FolderService,
    StatisticsService,
    RowService,
    NotificationsService,
  ],
})
export class BookMarkModule {}

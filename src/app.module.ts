import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { FolderModule } from './folder/folder.module';
import { RowModule } from './row/row.module';

import { StatisticsModule } from './statistics/statistics.module';
import { BookMarkModule } from './book-mark/book-mark.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [FolderModule, RowModule, StatisticsModule, BookMarkModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { RowService } from './row.service';
import { RowController } from './row.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FolderService } from 'src/folder/folder.service';

@Module({
  controllers: [RowController],
  providers: [RowService, PrismaService, FolderService],
})
export class RowModule {}
